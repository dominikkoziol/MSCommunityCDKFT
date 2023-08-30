# MSCommunityCDKFT

To proper run project you need: 
- [Azure Cli](https://www.google.com](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) - Remember to add Azure CLI to PATH
- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) - Remember to add Terraform to PATH
- [NodeJS](https://nodejs.org/en)

In the first place, use `az login` command and login with your's azure account.
If you want to start new project use `cdktf init`

If you're using existing project get all dependencies using `cdktf get`
If you want to add any other provider use `cdktf provider add <provider_name>`

When you want to release your code: `cdktf deploy` it can take sometime, as a result you should see plan with all the changes you are gonna to make to yours instance.
If you approve it changes will be apply automatically, you can also discard it or leave it for later on.

If you're just playing around, remember in the end of a day to destroy your infrastructure to avoid any unexpected costs with `cdktf destroy` command
