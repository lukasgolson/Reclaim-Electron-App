module.exports = {
  packagerConfig: {
	  icon: 'images/favicon.ico'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
		  setupIcon: 'images/favicon.ico'
	  },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
		options: {
			icon: '/images/icon.png',
        },
	  },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};