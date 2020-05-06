import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider, SnsTopic } from './.gen/providers/aws';

export class HelloTerra extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, 'aws', {
      region: 'eu-central-1',
      ignoreTags: [
        {
          keys: ["foo"],
        }
      ]
    })

    const topic = new SnsTopic(this, 'Topic', {
      displayName: 'overwritten',
    });
    topic.addOverride('display_name', 'topic')
    topic.addOverride('provider', 'aws')
    topic.addOverride('lifecycle', {create_before_destroy: true})
  }
}

const app = new App({});
new HelloTerra(app, 'hello-terra');
app.synth();