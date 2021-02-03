#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GraphqlDemoAppSyncStack } from '../lib/graphql-demo-app_sync-stack';

const app = new cdk.App();
new GraphqlDemoAppSyncStack(app, 'GraphqlDemoAppSyncStack');
