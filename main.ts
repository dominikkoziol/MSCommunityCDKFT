import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { AppServicePlan } from "@cdktf/provider-azurerm/lib/app-service-plan";
import { AppService } from "@cdktf/provider-azurerm/lib/app-service";

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

    const service = new AppService(this, "MSCommunityService", {
      name: "MSCommunityService",
      appServicePlanId: plan.id,
      resourceGroupName: rg.name,
      location: rg.location,
      dependsOn: [plan]
    });

    new TerraformOutput(this, "OurAppUrl", {
      value: `https://${service.name}.azureweb.net/`
    })
  }
}

const app = new App();
new MyStack(app, "MSCommunityCDKFT");
app.synth();
