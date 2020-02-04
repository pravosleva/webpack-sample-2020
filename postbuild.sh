#!/bin/bash

# 1
# find ./build/* -name '*main.*.css'
# OUTPUT:
# ./build/main.c806333b81395a0e1e36.css
# ./build/vendors~main.c806333b81395a0e1e36.css

# 2
# for f in ./build/*main.*.css; do echo $f; done;

# 3: Copy result of build to build/ forlder for production
if [ ! -d "build" ];
then
  mkdir "build"
  if [ ! $? -eq 0 ]; then
    echo "ERROR: build/ could not be created!"
    exit 1
  fi
else
  rm -rf build/*;
fi
echo -ne '                          (0%)\r'
echo '<?php
echo "
<html>
<head>
	<title>403 Forbidden</title>
</head>
<body>
  <p>Directory access is forbidden.</p>
</body>
</html>";' > './build/index.php'
# CSS
if [ ! -d "build/css" ]; then
  mkdir "build/css"
  if [ $? -eq 0 ]; then
    for i in ./dist/*main.*.css; do cp $i "build/css"; done;
  else
    echo "ERROR: build/css could not be created!"
    exit 1
  fi
fi
echo -ne '##                        (10%)\r'
# JS
if [ ! -d "build/js" ];
then
  mkdir "build/js"
  if [ $? -eq 0 ]; then
    for i in ./dist/*main.*.js; do cp $i "build/js"; done;
  else
    echo "ERROR: build/js could not be created!"
    exit 1
  fi
fi
echo -ne '####                      (20%)\r'
# FONTS: .ttf
if [ ! -d "build/fonts" ];
then
  mkdir "build/fonts"
  if [ $? -eq 0 ]; then
    for i in ./dist/*.ttf; do cp $i "build/fonts"; done;
  else
    echo "ERROR: build/fonts could not be created!"
    exit 1
  fi
fi
echo -ne '######                    (30%)\r'
# IMG: .png, .ico
if [ ! -d "build/img" ];
then
  mkdir "build/img"
  if [ $? -eq 0 ]; then
    for i in ./dist/*.png; do cp $i "build/img"; done;
    for i in ./dist/*.ico; do cp $i "build/img"; done;
  else
    echo "ERROR: build/img could not be created!"
    exit 1
  fi
fi
echo -ne '########                  (40%)\r'
sleep 1
echo -ne '########################  (100%)\r'

# 4
# cd build/css/ &&
# for i in ./*main.*.css; do cp $i `echo $i | sed "s/${$i}/output.css/g"`; done
# for i in ./*main.*.css; do openssl dgst -md4 $i; done

exit 0
