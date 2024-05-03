# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

#### login to UAECF subaccount 
cf api https://api.cf.eu10.hana.ondemand.com
cf login 

cf create-service xsuaa application smt_inv_app-uaa -c xs-security.json
cf create-service-key smt_inv_app-uaa smt_inv_app-uaa-key

cf create-service destination lite smt_inv_app-dest
cf create-service-key smt_inv_app-dest smt_inv_app-dest-key

cds bind -2 smt_inv_app-dest smt_inv_app-uaa


