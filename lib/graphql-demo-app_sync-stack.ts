import * as cdk from '@aws-cdk/core';
import * as appsync from "@aws-cdk/aws-appsync"
import * as lambda from "@aws-cdk/aws-lambda"

export class GraphqlDemoAppSyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // appsynd api
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-appsync-api-new',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        },
      }
    });

    // create lambda function
    const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code:  lambda.Code.fromAsset('lambda'),
      handler: 'welcome.handler',
    });

    // connect grapql api with lambda function
    const lambdaDataSource = api.addLambdaDataSource("FirstLambdaDataSource" , myLambda );

    // now we recall 
    // create resolver
    lambdaDataSource.createResolver({
      typeName : "Query",
      fieldName : "welcome",
      
    });

    lambdaDataSource.createResolver({
      typeName : "Mutation",
      fieldName : "addProduct",
    });

   const url =  new cdk.CfnOutput(this , "GraphQlUrl" , {
      value : api.graphqlUrl
    });

    const key = new cdk.CfnOutput(this, "GraphQlApi_Key" , {
      value : api.apiKey || " "
    })

  }
}
