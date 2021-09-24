import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider, Instance, Vpc, Subnet } from "./.gen/providers/aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here

    new AwsProvider(this, "aws", {
      region: "eu-central-1",
    });

    const vpc = new Vpc(this, 'MyVPC',{
      cidrBlock:"10.0.0.0/16"
    });

    const subnet = new Subnet(this,'subnet-a',{
      cidrBlock:"10.0.0.0/28",
      vpcId:vpc.id,
    });

    new Instance(this, "Linux2Instance", {
      ami: "ami-07df274a488ca9195",
      instanceType: "t2.micro",
      subnetId:subnet.id 
      ,
    });

    
  }
}

const app = new App();
new MyStack(app, "ec2-cdktf");
app.synth();
