import{_ as t,c as e,o as a,a as n}from"./app.1f5aefb2.js";const g='{"title":"CI/CD","description":"","frontmatter":{"sidebarDepth":3,"title":"CI/CD"},"headers":[{"level":2,"title":"Test GitHub Actions locally","slug":"test-github-actions-locally"},{"level":3,"title":"1. Install act","slug":"_1-install-act"},{"level":3,"title":"2. Set Environment Variables","slug":"_2-set-environment-variables"},{"level":3,"title":"3 Execute act","slug":"_3-execute-act"},{"level":2,"title":"Links","slug":"links-3"}],"relativePath":"guide/backend/ci-cd.md","lastUpdated":1644447714406}',o={},s=n(`<h1 id="ci-cd" tabindex="-1">CI/CD <a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a></h1><hr><h4 id="content" tabindex="-1">Content <a class="header-anchor" href="#content" aria-hidden="true">#</a></h4><p><div class="table-of-contents"><ul><li><a href="#test-github-actions-locally">Test GitHub Actions locally</a><ul><li><a href="#_1-install-act">1. Install act</a></li><li><a href="#_2-set-environment-variables">2. Set Environment Variables</a></li><li><a href="#_3-execute-act">3 Execute act</a></li></ul></li><li><a href="#links-3">Links</a></li></ul></div></p><hr><h2 id="test-github-actions-locally" tabindex="-1">Test GitHub Actions locally <a class="header-anchor" href="#test-github-actions-locally" aria-hidden="true">#</a></h2><h3 id="_1-install-act" tabindex="-1">1. Install act <a class="header-anchor" href="#_1-install-act" aria-hidden="true">#</a></h3><p>Setup</p><div class="language-bash"><pre><code><span class="token comment"># Homebrew (Linux/macOS)</span>
brew <span class="token function">install</span> act

<span class="token comment"># MacPorts (macOS)</span>
<span class="token function">sudo</span> port <span class="token function">install</span> act

<span class="token comment"># Chocolatey (Windows)</span>
choco <span class="token function">install</span> act-cli
</code></pre></div><h4 id="links" tabindex="-1">Links <a class="header-anchor" href="#links" aria-hidden="true">#</a></h4><ul><li><a href="https://github.com/nektos/act" target="_blank" rel="noopener noreferrer">https://github.com/nektos/act</a></li></ul><h3 id="_2-set-environment-variables" tabindex="-1">2. Set Environment Variables <a class="header-anchor" href="#_2-set-environment-variables" aria-hidden="true">#</a></h3><p>Copy the file <code>template.secrets</code> to a file named <code>.secrets</code> and replace <code>&quot;&lt;Please set this variable&gt;&quot;</code> with the right variables.</p><h4 id="update-openapi" tabindex="-1">Update OpenAPI <a class="header-anchor" href="#update-openapi" aria-hidden="true">#</a></h4><table><thead><tr><th>Variable</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>AZURE_BLOB_CONNECTION_STRING</code></td><td>Azure blob connection string</td><td></td></tr><tr><td><code>AZURE_CREDENTIALS</code></td><td>Azure credentials</td><td></td></tr><tr><td><code>OPENAPI_SPECIFICATION_PATH</code></td><td>Azure blob connection string</td><td><code>Code/BackendAPI/backendApi.yaml</code></td></tr><tr><td><code>OPENAPI_URL_PATH</code></td><td>Azure blob connection string</td><td><code>/v2</code></td></tr><tr><td><code>RESOURCE_GROUP</code></td><td>Azure blob connection string</td><td><code>similarity-detector</code></td></tr><tr><td><code>API_MANAGEMENT_SERVICE_NAME</code></td><td>Azure blob connection string</td><td><code>apim-similarity-detector</code></td></tr><tr><td><code>API_MANAGEMENT_API_ID</code></td><td>Azure blob connection string</td><td><code>apim-similarity-detector-id</code></td></tr></tbody></table><p>To get the <code>AZURE_CREDENTIALS</code> fill out the variables in the script <code>create_credentials.sh</code> and execute it.</p><h4 id="unit-tests" tabindex="-1">Unit tests <a class="header-anchor" href="#unit-tests" aria-hidden="true">#</a></h4><p>Setup environment variables online in GitHub</p><div class="language-bash"><pre><code>gh secret <span class="token builtin class-name">set</span> -f ./Code/BackendAPI/tests/unit/unit_tests.env

<span class="token builtin class-name">cd</span> Code/BackendAPI/scripts <span class="token operator">&amp;&amp;</span> python env_github.py
</code></pre></div><h5 id="links-1" tabindex="-1">Links <a class="header-anchor" href="#links-1" aria-hidden="true">#</a></h5><ul><li><a href="https://github.com/snok/install-poetry" target="_blank" rel="noopener noreferrer">https://github.com/snok/install-poetry</a></li><li><a href="https://blog.dennisokeeffe.com/blog/2021-08-08-pytest-with-github-actions" target="_blank" rel="noopener noreferrer">https://blog.dennisokeeffe.com/blog/2021-08-08-pytest-with-github-actions</a></li><li><a href="https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python?langId=py" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python?langId=py</a></li><li><a href="https://thiagolopessilva.medium.com/running-unit-testing-on-github-action-using-pytest-61653d993c9c" target="_blank" rel="noopener noreferrer">https://thiagolopessilva.medium.com/running-unit-testing-on-github-action-using-pytest-61653d993c9c</a></li></ul><h4 id="update-openapi-1" tabindex="-1">Update OpenAPI <a class="header-anchor" href="#update-openapi-1" aria-hidden="true">#</a></h4><p>For <code>update_openapi.yaml</code> file set the environment variables as follows.</p><p>Get the Azure Blob Storage connection string from <a href="https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys" target="_blank" rel="noopener noreferrer">View account access keys</a>. Copy it to the clipboard.</p><p>Execute:</p><div class="language-bash"><pre><code><span class="token comment"># Paste secret value for the current repository in an interactive prompt</span>
gh secret <span class="token builtin class-name">set</span> AZURE_BLOB_CONNECTION_STRING

<span class="token comment"># Paste the connection string in the interactive prompt</span>
</code></pre></div><p>Copy the new list of environment variables to the <code>env</code> section of the <em>Run unit tests</em> command in <code>unit_tests.yaml</code>.</p><h5 id="links-2" tabindex="-1">Links <a class="header-anchor" href="#links-2" aria-hidden="true">#</a></h5><ul><li><a href="https://github.com/marketplace/actions/azure-blob-upload" target="_blank" rel="noopener noreferrer">https://github.com/marketplace/actions/azure-blob-upload</a></li><li><a href="https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys</a></li><li><a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts" target="_blank" rel="noopener noreferrer">https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts</a></li></ul><h3 id="_3-execute-act" tabindex="-1">3 Execute act <a class="header-anchor" href="#_3-execute-act" aria-hidden="true">#</a></h3><p>Use <em>act</em> (<a href="https://github.com/nektos/act" target="_blank" rel="noopener noreferrer">https://github.com/nektos/act</a> ) to run GitHub Actions locally.</p><p>Helpful commands:</p><table><thead><tr><th style="text-align:left;">Command</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>act</code></td><td style="text-align:left;">Run workflows</td></tr><tr><td style="text-align:left;"><code>act -l</code></td><td style="text-align:left;">List workflows</td></tr><tr><td style="text-align:left;"><code>act -n</code></td><td style="text-align:left;">Run dryrun</td></tr><tr><td style="text-align:left;"><code>act -j &lt;jobname&gt;</code></td><td style="text-align:left;">Select specific job</td></tr><tr><td style="text-align:left;"><code>act --secret-file &lt;secret file&gt;</code></td><td style="text-align:left;">Specify secret file for environment variables</td></tr></tbody></table><p>Execute workflows (run from <code>amos2021ws06-exp-similarity-detector</code> directory)</p><div class="language-bash"><pre><code><span class="token comment"># Execute job unit_tests with act</span>
act --secret-file .secrets -j unit_tests

<span class="token comment"># Execute job build_and_deploy with act</span>
act --secret-file .secrets -j build_and_deploy  

<span class="token comment"># Execute job integration_tests with act</span>
act --secret-file .secrets -j integration_tests

<span class="token comment"># Execute job update_openapi with act</span>
act --secret-file .secrets -j upload_openapi
</code></pre></div><h2 id="links-3" tabindex="-1">Links <a class="header-anchor" href="#links-3" aria-hidden="true">#</a></h2><ul><li><a href="https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions</a></li><li><a href="https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths</a></li><li><a href="https://github.com/actions/setup-python" target="_blank" rel="noopener noreferrer">https://github.com/actions/setup-python</a></li><li><a href="https://github.com/marketplace/actions/azure-functions-action" target="_blank" rel="noopener noreferrer">https://github.com/marketplace/actions/azure-functions-action</a></li><li><a href="https://github.com/Azure/actions-workflow-samples/blob/master/FunctionApp/linux-python-functionapp-on-azure.yml" target="_blank" rel="noopener noreferrer">https://github.com/Azure/actions-workflow-samples/blob/master/FunctionApp/linux-python-functionapp-on-azure.yml</a></li></ul>`,37),r=[s];function i(c,l,d,h,p,u){return a(),e("div",null,r)}var m=t(o,[["render",i]]);export{g as __pageData,m as default};
