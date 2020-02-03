
echo "HELLO"
echo $?

echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
echo -ne '#######################   (100%)\r'
echo -ne '\n'

# 1
# find ./dist/* -name '*main.*.css'
# OUTPUT:
# ./dist/main.c806333b81395a0e1e36.css
# ./dist/vendors~main.c806333b81395a0e1e36.css

# 2
# for f in ./dist/*main.*.css; do echo $f; done;

# 3
# CSS
if [ ! -d "dist/css" ]; then
  mkdir "dist/css"
  if [ $? -eq 0 ]; then
    for i in ./dist/*main.*.css; do cp $i "dist/css"; done;
  else
    echo "ERROR: dist/css could not be created!"
    exit 1
  fi
fi
# JS
if [ ! -d "dist/js" ];
then
  mkdir "dist/js"
  if [ $? -eq 0 ]; then
    for i in ./dist/*main.*.js; do cp $i "dist/js"; done;
  else
    echo "ERROR: dist/js could not be created!"
    exit 1
  fi
fi
# FONTS: .ttf
if [ ! -d "dist/fonts" ];
then
  mkdir "dist/fonts"
  if [ $? -eq 0 ]; then
    for i in ./dist/*.ttf; do cp $i "dist/fonts"; done;
  else
    echo "ERROR: dist/fonts could not be created!"
    exit 1
  fi
fi
# IMG: .png, .ico
if [ ! -d "dist/img" ];
then
  mkdir "dist/img"
  if [ $? -eq 0 ]; then
    for i in ./dist/*.png; do cp $i "dist/img"; done;
    for i in ./dist/*.ico; do cp $i "dist/img"; done;
  else
    echo "ERROR: dist/img could not be created!"
    exit 1
  fi
fi

# 4
# cd dist/css/ &&
# for i in ./*main.*.css; do cp $i `echo $i | sed "s/${$i}/output.css/g"`; done
# for i in ./*main.*.css; do openssl dgst -md4 $i; done

exit 0
