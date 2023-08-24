import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { AppServicePlan } from "@cdktf/provider-azurerm/lib/app-service-plan";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import MyAppService from "./MyAppService";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here

    new AzurermProvider(this, "MSCommunity", {features: {} });

    const rg = new ResourceGroup(this, "MSCommunityRG", {
      location: "eastus",
      name: "MSCommunityRG"
    })

    const plan = new AppServicePlan(this, "MSCommunityServicePlan", {
      name: "MSCommunityServicePlan",
      kind: "Windows",
      resourceGroupName: rg.name,
      location: rg.location,
      sku: { tier: "Free", size: "F1" },
      dependsOn: [rg]
    })

    const service1 = new MyAppService(this, "MSCommunityAppServiceId1", "MSCommunityAppService1", rg, plan);
    const service2 = new MyAppService(this, "MSCommunityAppServiceId2", "MSCommunityAppService2", rg, plan);
    const service3 = new MyAppService(this, "MSCommunityAppServiceId3", "MSCommunityAppService3", rg, plan);

    new TerraformOutput(this, "OurAppUrl0", {
      value: `https://${service1.name}.azureweb.net/`
    })

    new TerraformOutput(this, "OurAppUrl1", {
      value: `https://${service2.name}.azureweb.net/`
    })

    new TerraformOutput(this, "OurAppUrl2", {
      value: `https://${service3.name}.azureweb.net/`
    })
  }
}

const app = new App();
new MyStack(app, "MSCommunityCDKFT");
app.synth();