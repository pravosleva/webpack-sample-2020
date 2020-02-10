#!/bin/bash

# # README.md
# ## Main setting for postbuild script for the app
# _`package.json`_
# "scripts": {
#   // ...
#   "postbuild": "bash postbuild.sh <APP_ID>", // Set your app name (no spaces)
#   // ...
# }
#
# `npm run build:prod`
# For have build product for production to ../build.${APP_ID}. And also you can see bundle analyzer in ./dist/report.html.

# Get APP_ID from first argument or exit:
if [ ! $# -eq 1 ]
then
  echo "--- POSTBUILD ERROR! ---"
  echo "ONLY FIRST ARGUMENT REQUIRED AS APP ID for create new dir: ./build.APP_ID"
  echo "---"
  exit 1
else
  echo "POSTBUILD SCRIPT STARTED..."
  APP_ID=$1
  echo ${APP_ID}
fi

# Copy result of build from ./dist to ../build/.${APP_ID} for production
EXTERNAL_DIR=""$(dirname "$PWD")""
# Step 1: Create dir if necessary
if [ ! -d "${EXTERNAL_DIR}/build.${APP_ID}" ];
then
  mkdir "${EXTERNAL_DIR}/build.${APP_ID}"
  if [ ! $? -eq 0 ]; then
    echo "ERROR: ${EXTERNAL_DIR}/build.${APP_ID} could not be created!"
    exit 1
  fi
else
  rm -rf ${EXTERNAL_DIR}/build.${APP_ID}/*;
fi
echo -ne '                          (0%)\r'
echo '<?php
echo "<html>
<head>
  <title>403 Forbidden</title>
</head>
<body>
  <p>Directory access is forbidden.</p>
</body>
</html>";' > "${EXTERNAL_DIR}/build.${APP_ID}/index.php"
# Step 2: CSS & FONTS: .css, .ttf
if [ ! -d "build.${APP_ID}/css" ]; then
  mkdir "${EXTERNAL_DIR}/build.${APP_ID}/css"
  if [ $? -eq 0 ]; then
    # for i in ./dist/*main.*.css; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/css"; done;
    for i in ./dist/*.css; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/css"; done;
    for i in ./dist/*.ttf; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/css"; done;
  else
    echo "ERROR: ${EXTERNAL_DIR}/build.${APP_ID}/css could not be created!"
    exit 1
  fi
fi
echo -ne '##                        (10%)\r'
# Step 3:JS
if [ ! -d "${EXTERNAL_DIR}/build.${APP_ID}/js" ];
then
  mkdir "${EXTERNAL_DIR}/build.${APP_ID}/js"
  if [ $? -eq 0 ]; then
    # for i in ./dist/*main.*.js; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/js"; done;
    for i in ./dist/*.js; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/js"; done;
  else
    echo "ERROR: ${EXTERNAL_DIR}/build.${APP_ID}/js could not be created!"
    exit 1
  fi
fi
echo -ne '######                    (30%)\r'
# Step 4: IMG: .png, .ico
if [ ! -d "${EXTERNAL_DIR}/build.${APP_ID}/img" ];
then
  mkdir "${EXTERNAL_DIR}/build.${APP_ID}/img"
  if [ $? -eq 0 ]; then
    for i in ./dist/*.png; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/img"; done;
    for i in ./dist/*.ico; do cp $i "${EXTERNAL_DIR}/build.${APP_ID}/img"; done;
  else
    echo "ERROR: ${EXTERNAL_DIR}/build.${APP_ID}/img could not be created!"
    exit 1
  fi
fi
echo -ne '########################  (100%)\r'
exit 0
