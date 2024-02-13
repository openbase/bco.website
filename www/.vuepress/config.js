import { defaultTheme } from 'vuepress'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
    title: 'Base Cube One',
    description: 'Smart Environment Automation Framework',
    theme: defaultTheme({
        // default theme config
        logo: '/images/bco_logo_simple_small.png',
        logoDark: '/images/bco_logo_simple_white.png',
        navbar: [
            {text: 'Installation', link: '/user/installation'},
            {text: 'User', link: '/user/'},
            {text: 'Developer', link: '/developer/'},
            {text: 'Openbase', link: 'https://openbase.org'}

        ],
        //displayAllHeaders: false,
        sidebar: {
          '/user/': [
            {
              text: 'User',
              children: [
                '/user/bcozy',
                '/user/bcomfy'
              ],
            },
          ],
          '/developer/': [
            {
              text: 'Developer',
              children: [
                '/developer/installation',
                '/developer/startup-tools',
                '/developer/directory-structure',
                 '/developer/architecture',
                 '/developer/authentication/',
                 '/developer/contribution',
                 '/developer/code-examples',
                 '/developer/ui/'
                 ],
            },
           ],

           // fallback
           '/': [
            {
                text: ' ',
                children: [
                '',
                '/user/installation',
                '/user/',
                '/developer/'
                ],
            },
           ],
        },
        // plugins: [
          // Sadly, the docsearch plugin is not working with the current version of vuepress (said copilot)
        //   docsearchPlugin({
        //     appId: '1VCFHJF1L1',
        //     apiKey: 'd4761fd2ef0a03d40066142bb969b6b9',
        //     indexName: 'BCO Website',
        //     locales: {
        //       '/': {
        //         placeholder: 'Search Documentation',
        //         translations: {
        //           button: {
        //             buttonText: 'Search Documentation',
        //           },
        //         },
        //       },
        //       '/zh/': {
        //         placeholder: '搜索文档',
        //         translations: {
        //           button: {
        //             buttonText: '搜索文档',
        //           },
        //         },
        //       },
        //     },
        //   }),
        // ],
        lastUpdated: 'Last Updated',
        repo: 'openbase',
        docsRepo: 'openbase/bco.website',
        docsDir: 'www',
        editLinks: true,

    }),
}