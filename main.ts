import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { AppService } from "@cdktf/provider-azurerm/lib/app-service";
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

    const service1 = new MyAppService(this, "MSCommunityAppServiceId1", "MSCommunityAppServiceId2", rg, plan);
    const service2 = new MyAppService(this, "MSCommunityAppServiceId1", "MSCommunityAppServiceId2", rg, plan);
    const service3 = new MyAppService(this, "MSCommunityAppServiceId1", "MSCommunityAppServiceId2", rg, plan);

    new TerraformOutput(this, "OurAppUrl", {
      value: `https://${service1.name}.azureweb.net/`
    })
  }
}

const app = new App();
new MyStack(app, "MSCommunityCDKFT");
app.synth();