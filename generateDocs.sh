for folder_name in $(ls -d src/components/*); do
  file_name=$(basename $folder_name)
  npx vuedoc.md $folder_name/$file_name.vue --output $folder_name

  cd $folder_name
  mv -v $file_name.md README.md
  cd -
done
