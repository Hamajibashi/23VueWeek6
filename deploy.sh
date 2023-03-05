#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main  #這邊的分支跟你當初git push的分支要同一個
git add -A
git commit -m 'deploy'

#以下是兩個選項，要main分支的選擇一，要gh-pages選擇二：

# 選擇一：if you are deploying to https://<hamajibashi>.github.io
# git push -f git@github.com:Hamajibashi/Hamajibashi.github.io.git main

# 選擇二：if you are deploying to https://<hamajibashi>.github.io/<23VueWeek6>
git push -f https://github.com/Hamajibashi/23VueWeek6.git main:gh-pages

#這邊的分支跟你當初git push的分支要同一個，如果是master，就寫master:gh-pages

cd -