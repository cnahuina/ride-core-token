const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')

StyleDictionary.registerFormat({
  name: `custom/expand`,
  formatter: function ({ dictionary }) {

    return dictionary.allTokens.map(token => {
      if (typeof token.value === "object") {
        const { path } = token;
        return Object.entries(token.value).map(([key, value]) => {

      
          return `$${path.join("-")}-${key.toLowerCase()}:"${value}";`
        }).join(`\n`)
      } else {
        let value = JSON.stringify(token.value);

        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach(ref => {
            value = value.replace(ref.value, function () {
              
              return `$${ref.name}`;
            });
          });
        }
        // if(token.name.indexOf("ride-") < 0){
        //   token.name = "ride-" + token.name;
        //  }
        return `$${token.name}:${value};`.replace("ride-sp-","")
      }
    }).join(`\n`)
  }
})


const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)


StyleDictionaryExtended.buildAllPlatforms()



// const StyleDictionaryPackage = require('style-dictionary');

// // HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

// function getStyleDictionaryConfig(brand, platform) {
//   return {
//     "source": [
//       `tokens/brands/${brand}/*.json`,
//       "tokens/globals/**/*.json",
//       `tokens/platforms/${platform}/*.json`
//     ],
//     "platforms": {
//       "web": {
//         "transformGroup": "web",
//         "buildPath": `dist/tokens/web/${brand}/`,
//         "files": [{
//           "destination": "tokens.scss",
//           "format": "scss/variables"
//         }]
//       },
//       "android": {
//         "transformGroup": "android",
//         "buildPath": `dist/tokens/android/${brand}/`,
//         "files": [{
//           "destination": "tokens.colors.xml",
//           "format": "android/colors"
//         },{
//           "destination": "tokens.dimens.xml",
//           "format": "android/dimens"
//         },{
//           "destination": "tokens.font_dimens.xml",
//           "format": "android/fontDimens"
//         }]
//       },
//       "ios": {
//         "transformGroup": "ios",
//         "buildPath": `dist/tokens/ios/${brand}/`,
//         "files": [{
//           "destination": "tokens.h",
//           "format": "ios/macros"
//         }]
//       }
//     }
//   };
// }

// console.log('Build started...');

// // PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

// ['brand-1', 'brand-2', 'brand-3'].map(function (brand) {
//   ['web', 'ios', 'android'].map(function (platform) {

//     console.log('\n==============================================');
//     console.log(`\nProcessing: [${platform}] [${brand}]`);

//     const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

//     StyleDictionary.buildPlatform(platform);

//     console.log('\nEnd processing');

//   })
// })

// console.log('\n==============================================');
// console.log('\nBuild completed!');
