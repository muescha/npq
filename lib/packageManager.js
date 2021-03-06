'use strict'

const childProcess = require('child_process')
const DEFAULT_PKGMGR = 'npm'
const PKGMGR_INSTALL_CMD = {
  npm: 'install',
  yarn: 'add'
}

class packageManager {
  static process (packageManager, packages) {
    packageManager = this.validatePackageManager(packageManager)
    return this.spawnPackageManager(packageManager, packages)
  }

  static spawnPackageManager (packageManager, packages = []) {
    let args = []
    if (Array.isArray(packages) && packages.length) {
      args = args.concat(PKGMGR_INSTALL_CMD[packageManager], packages)
    } else {
      args = args.concat(process.argv.slice(2))
    }

    const child = childProcess.spawn(packageManager, args, {
      stdio: 'inherit',
      shell: true
    })

    return Promise.resolve(child)
  }

  static validatePackageManager (packageManager) {
    if (!packageManager) {
      packageManager = this.getDefaultPackageManager()
    }

    if (typeof packageManager !== 'string') {
      throw new Error('a packageManager should be specified as a string')
    }

    return packageManager
  }

  static getDefaultPackageManager () {
    return DEFAULT_PKGMGR
  }
}

module.exports = packageManager
