## Commandes
Strip photo metadata
> magick mogrify -strip *.jpg

Reduce size
> magick mogrify -path resized -resize 1920 -quality 85 *.jpg

Create thumbnails
> magick *.jpg -thumbnail 300x300 -quality 85 -strip -set filename:out "%t_thumb" "%[filename:out].jpg"