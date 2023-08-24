
import { AppService } from "@cdktf/provider-azurerm/lib/app-service";
import { AppServicePlan } from "@cdktf/provider-azurerm/lib/app-service-plan";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { TerraformStack } from "cdktf";

export default class MyAppService extends AppService {
    constructor(scope: TerraformStack, id: string, name: string, rg: ResourceGroup, plan: AppServicePlan) {
        super(
            scope,
            id,
            {
                appServicePlanId: plan.id,
                name: name,
                resourceGroupName: rg.name,
                location: rg.location,
                dependsOn: [plan]
            }
        );
    }
}