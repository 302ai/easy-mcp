import { join } from 'node:path';
import { promises as fs } from 'node:fs';

interface PackageJson {
  version: string;
  [key: string]: unknown;
}

async function cleanup(app: string, url: URL): Promise<void> {
  const appPath = join(url.pathname, app);

  console.log('Cleaning up', appPath);

  try {
    const stats = await fs.stat(appPath);
    if (!stats.isDirectory()) {
      return;
    }

    const packageJsonPath = join(appPath, 'package.json');
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent) as PackageJson;

    packageJson.version = '0.0.0';
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    const changelogPath = join(url.pathname, 'examples', app, 'CHANGELOG.md');
    try {
      await fs.unlink(changelogPath);
      console.log('Deleted', changelogPath);
    } catch (err: any) {
      if (err.code !== 'ENOENT') throw err;
    }
  } catch (err: any) {
    console.error(`Error processing ${appPath}:`, err.message);
  }
}

async function main(): Promise<void> {
  try {
    const examplesUrl = new URL('../../examples', import.meta.url);
    const apps = await fs.readdir(examplesUrl);

    // Process all apps in parallel
    await Promise.all(apps.map(app => cleanup(app, examplesUrl)));

    console.log('All examples processed successfully');
  } catch (error: any) {
    console.error('Failed to process examples:', error.message);
    process.exit(1);
  }
}

main();
