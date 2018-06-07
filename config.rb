activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets
sprockets.append_path File.join(root, 'source')


page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
<<<<<<< HEAD
  ignore { |path| path =~ /\/(.*)\.js$/ && $1 != 'index' }
=======
>>>>>>> parent of ddd368d... Merge pull request #19 from sherpanat/add-webpack
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
