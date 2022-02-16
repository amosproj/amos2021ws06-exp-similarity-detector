import{_ as e,c as t,o as r,a}from"./app.1f5aefb2.js";const y='{"title":"Deployment","description":"","frontmatter":{"sidebarDepth":3,"title":"Deployment"},"headers":[{"level":2,"title":"0. Clone Git Repository","slug":"_0-clone-git-repository"},{"level":2,"title":"1. Setup Infrastructure On Azure - Part 1 (Azure Container Registry)","slug":"_1-setup-infrastructure-on-azure-part-1-azure-container-registry"},{"level":2,"title":"2. Set Environment Variables - Part 1","slug":"_2-set-environment-variables-part-1"},{"level":2,"title":"3. Use act To Build And Deploy The Container - Part 1 (Initially)","slug":"_3-use-act-to-build-and-deploy-the-container-part-1-initially"},{"level":2,"title":"4. Setup Infrastructure On Azure - Part 2 (Azure App Service / Database)","slug":"_4-setup-infrastructure-on-azure-part-2-azure-app-service-database"},{"level":2,"title":"5. Set Environment Variables - Part 2","slug":"_5-set-environment-variables-part-2"},{"level":2,"title":"6. Use act To Build And Deploy The Container - Part 2 (Deploy and restart)","slug":"_6-use-act-to-build-and-deploy-the-container-part-2-deploy-and-restart"},{"level":2,"title":"7. Set Up Environment Variables On GitHub (Optional)","slug":"_7-set-up-environment-variables-on-github-optional"}],"relativePath":"guide/frontend/deployment.md","lastUpdated":1644447714412}',o={},i=a(`<h1 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-hidden="true">#</a></h1><hr><h4 id="content" tabindex="-1">Content <a class="header-anchor" href="#content" aria-hidden="true">#</a></h4><p><div class="table-of-contents"><ul><li><a href="#_0-clone-git-repository">0. Clone Git Repository</a></li><li><a href="#_1-setup-infrastructure-on-azure-part-1-azure-container-registry">1. Setup Infrastructure On Azure - Part 1 (Azure Container Registry)</a></li><li><a href="#_2-set-environment-variables-part-1">2. Set Environment Variables - Part 1</a></li><li><a href="#_3-use-act-to-build-and-deploy-the-container-part-1-initially">3. Use act To Build And Deploy The Container - Part 1 (Initially)</a></li><li><a href="#_4-setup-infrastructure-on-azure-part-2-azure-app-service-database">4. Setup Infrastructure On Azure - Part 2 (Azure App Service / Database)</a></li><li><a href="#_5-set-environment-variables-part-2">5. Set Environment Variables - Part 2</a></li><li><a href="#_6-use-act-to-build-and-deploy-the-container-part-2-deploy-and-restart">6. Use act To Build And Deploy The Container - Part 2 (Deploy and restart)</a></li><li><a href="#_7-set-up-environment-variables-on-github-optional">7. Set Up Environment Variables On GitHub (Optional)</a></li></ul></div></p><hr><p>To deploy the infrastructure and code follow the following steps:</p><p>For the initial setup use Steps <a href="#_0-clone-git-repository">0. (Clone Git Repository)</a> - <a href="#_5-set-environment-variables-part-2">7. (Set Up Environment Variables On GitHub Optional)</a>. These Steps must be executed only once at the beginning.</p><p>If it has already been deployed initially, proceed to step <a href="#_6-use-act-to-build-and-deploy-the-container-part-2-deploy-and-restart">6. Use <code>act</code> To Build And Deploy The Container - Part 2 (Deploy and restart)</a>.</p><h2 id="_0-clone-git-repository" tabindex="-1">0. Clone Git Repository <a class="header-anchor" href="#_0-clone-git-repository" aria-hidden="true">#</a></h2><div class="language-bash"><pre><code><span class="token comment"># SSH</span>
<span class="token function">git</span> clone git@github.com:Re-Krass/amos2021ws06-exp-similarity-detector-frontend.git
<span class="token comment"># HTTPS</span>
<span class="token function">git</span> clone <span class="token function">git</span> clone https://github.com/Re-Krass/gitamos2021ws06-exp-similarity-detector.git

</code></pre></div><ul><li><p>Or download the latest release and unzip the package from:<br><a href="https://github.com/Re-Krass/amos2021ws06-exp-similarity-detector-frontend/releases/latest" target="_blank" rel="noopener noreferrer">latest</a></p></li><li><p>Or you can also download the <code>Amos_Project_6_Exp_Similarity_Detector.mpk</code> file directly from the <a href="https://github.com/Re-Krass/amos2021ws06-exp-similarity-detector-frontend/releases/latest" target="_blank" rel="noopener noreferrer">latest</a> release.</p><ul><li>Unpack the <code>Amos_Project_6_Exp_Similarity_Detector.mpk</code> file an empty folder.</li></ul></li></ul><h2 id="_1-setup-infrastructure-on-azure-part-1-azure-container-registry" tabindex="-1">1. Setup Infrastructure On Azure - Part 1 (Azure Container Registry) <a class="header-anchor" href="#_1-setup-infrastructure-on-azure-part-1-azure-container-registry" aria-hidden="true">#</a></h2><ol><li>Set up Azure Container Registry <ol><li>Set up an <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ContainerRegistry%2Fregistries" target="_blank" rel="noopener noreferrer">Azure Container Registry</a>. For example the name is <code>testregistry</code>.</li><li>Set up the desired <code>Resource Group</code> (e.g. <code>amos-ws-21-22</code>).</li><li>Get the login data in your created registry under: <code>Settings</code> &gt; <code>Access keys</code>.</li><li>Enable <code>Admin Username</code>.</li><li>Save the credentials for <code>Registry name</code> (e.g. <code>testregistry</code>), <code>Login server</code> (e.g. <code>testregistry.azurecr.io</code>), <code>Username</code> (e.g. <code>testregistry</code>) and <code>Password</code> (e.g. <code>password1234</code>).</li><li>The username and password is to login into the ACR.</li><li>Settings &gt; Access key.</li></ol></li></ol><h2 id="_2-set-environment-variables-part-1" tabindex="-1">2. Set Environment Variables - Part 1 <a class="header-anchor" href="#_2-set-environment-variables-part-1" aria-hidden="true">#</a></h2><ol><li>Copy the file <code>template.secrets</code> to a file named <code>.secrets</code> and replace <code>&quot;&lt;Please set this variable&gt;&quot;</code> with the right variables. See table below.</li></ol><table><thead><tr><th>Variable name</th><th>Description</th><th>ACR Name</th><th>Example</th></tr></thead><tbody><tr><td><code>ACR_URL</code></td><td>Name of Azure Container Registry</td><td><code>Login server</code></td><td><code>testregistry.azurecr.io</code></td></tr><tr><td><code>DOCKER_USERNAME</code></td><td>Username for Azure Container Registry</td><td><code>Username</code></td><td><code>testregistry</code></td></tr><tr><td><code>ACR_PW</code></td><td>Password for Azure Container Registry</td><td><code>Password</code></td><td><code>password1234</code></td></tr></tbody></table><h2 id="_3-use-act-to-build-and-deploy-the-container-part-1-initially" tabindex="-1">3. Use <code>act</code> To Build And Deploy The Container - Part 1 (Initially) <a class="header-anchor" href="#_3-use-act-to-build-and-deploy-the-container-part-1-initially" aria-hidden="true">#</a></h2><ol start="0"><li>Install <a href="https://github.com/nektos/act" target="_blank" rel="noopener noreferrer">act</a>.</li><li>Execute command (from the <code>amos2021ws06-exp-similarity-detector-frontend</code> directory):<br><code>act --secret-file .secrets -j build_and_deploy_initial</code></li></ol><h2 id="_4-setup-infrastructure-on-azure-part-2-azure-app-service-database" tabindex="-1">4. Setup Infrastructure On Azure - Part 2 (Azure App Service / Database) <a class="header-anchor" href="#_4-setup-infrastructure-on-azure-part-2-azure-app-service-database" aria-hidden="true">#</a></h2><ol><li>Set up Azure App Service <ol><li>Basics <ol><li>Set up an <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites" target="_blank" rel="noopener noreferrer">Azure App Service</a>.</li><li>Select the desired <code>Resource Group</code> (e.g. <code>amos-ws-21-22</code>).</li><li>Set the <code>Name</code> of the instance (e.g. <code>similarity-detector</code>).</li><li>Select under <code>Publish</code> <code>Docker Container</code>.</li><li>Use <code>Linux</code> as <code>Operating System</code>.</li><li>Set up the other required settings.</li><li>Click on the <code>Next: Docker &gt;</code> button.</li></ol></li><li>Docker <ol><li>Select as <code>Image Source</code> <code>Azure Container Registry</code>.</li><li>Under <code>Registry</code> select the previously created registry (e.g. <code>testregistry</code>).</li><li>Select the right <code>Image</code> (e.g. <code>similaritydetectordocker/mendixdocker</code>).</li><li>Select the right <code>Tag</code> (e.g. <code>dev</code>).</li></ol></li></ol></li><li>Set up database <ol><li>Set up database named <code>mendix</code> (for example on Azure)</li></ol></li><li>Set up environment variables on Azure <ol><li>Go to the previously created App Service (<code>similarity-detector</code>).</li><li>Go to <code>Settings</code> &gt; <code>Configuration</code> &gt; <code>Application Settings</code>.</li><li>Add the following environment variables (For Mendix login):</li></ol></li></ol><table><thead><tr><th>Variable name</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>ADMIN_PASSWORD</code></td><td>Password for the Mendix website login</td><td></td></tr><tr><td><code>DATABASE_ENDPOINT</code></td><td>Connection string for database</td><td><code>postgres://...</code></td></tr><tr><td><code>WEBSITES_PORT</code></td><td>Port for Mendix frontend</td><td><code>8080</code></td></tr></tbody></table><h2 id="_5-set-environment-variables-part-2" tabindex="-1">5. Set Environment Variables - Part 2 <a class="header-anchor" href="#_5-set-environment-variables-part-2" aria-hidden="true">#</a></h2><p>Go to the <code>.secrets</code> and replace the missing variables values <code>&quot;&lt;Please set this variable&gt;&quot;</code> with the right variables values.</p><table><thead><tr><th>Variable name</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>AZURE_CREDENTIALS</code></td><td>Credentials for Azure</td><td><code>{&quot;clientId&quot;: &quot;...&quot;, &quot;clientSecret: &quot;...&quot; ...}</code></td></tr><tr><td><code>AZURE_APP_SERVICE_NAME</code></td><td>Name of the Azure WebApp</td><td><code>similarity-detector</code></td></tr><tr><td><code>AZURE_APP_SERVICE_RESOURCE_GROUP</code></td><td>Name of the Azure Resource Group</td><td><code>amos-ws-21-22</code></td></tr></tbody></table><p>To get the <code>AZURE_CREDENTIALS</code> fill out the variables in the script <code>create_credentials.sh</code> (<code>.github/workflows/create_credentials.sh</code>) and execute it. Copy and paste the output in the <code>AZURE_CREDENTIALS</code> secret variable on GitHub or copy it in a single line for local execution.</p><h2 id="_6-use-act-to-build-and-deploy-the-container-part-2-deploy-and-restart" tabindex="-1">6. Use <code>act</code> To Build And Deploy The Container - Part 2 (Deploy and restart) <a class="header-anchor" href="#_6-use-act-to-build-and-deploy-the-container-part-2-deploy-and-restart" aria-hidden="true">#</a></h2><p>Execute command (from the <code>amos2021ws06-exp-similarity-detector-frontend</code> directory):<br><code>act --secret-file .secrets -j build_and_deploy</code></p><h2 id="_7-set-up-environment-variables-on-github-optional" tabindex="-1">7. Set Up Environment Variables On GitHub (Optional) <a class="header-anchor" href="#_7-set-up-environment-variables-on-github-optional" aria-hidden="true">#</a></h2><p>Set these variables in the <em>Secrets</em> section on GitHub if you like to use GitHub Actions CI to build and deploy the website.<br> For descriptions see the sections above.</p><table><thead><tr><th>Variable name</th></tr></thead><tbody><tr><td><code>ACR_URL</code></td></tr><tr><td><code>DOCKER_USERNAME</code></td></tr><tr><td><code>ACR_PW</code></td></tr><tr><td><code>AZURE_CREDENTIALS</code></td></tr><tr><td><code>AZURE_APP_SERVICE_NAME</code></td></tr><tr><td><code>AZURE_APP_SERVICE_RESOURCE_GROUP</code></td></tr></tbody></table>`,30),d=[i];function n(l,s,c,p,u,h){return r(),t("div",null,d)}var m=e(o,[["render",n]]);export{y as __pageData,m as default};
