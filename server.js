const serverless = require('serverless-http')
const app = require('./lib/app')
module.exports.run = serverless(app)

// , {
//     request: function(request, event, context) {
//         request.context = event.requestContext;
//     },
//     response: function(response, event, context) {
//         // you can return promises, but the value of the promise is ignored
//         return new Promise(resolve => {
//             // override a property of the response, this will affect the response
//             response.statusCode = 420;

//             // delay your responses by 300ms!
//             setTimeout(300, () => {
//                 resolve('banana'); // this value has no effect on the response
//             });
//         });
//     }
// }