activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :external_pipeline,
   name: :webpack,
   command: build? ?
     "./node_modules/webpack/bin/webpack.js --bail -p" :
     "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
   source: ".tmp/dist",
   latency: 1

configure :build do
  ignore { |path| path =~ /\/(.*)\.js$/ && $1 != 'site' }
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :relative_assets
  set :relative_links, true
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
end
