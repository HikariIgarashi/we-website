FROM jekyll/jekyll:4.2.0

WORKDIR /srv/jekyll

COPY . .

EXPOSE 4000

CMD ["jekyll", "serve", "--host", "0.0.0.0", "--livereload"] 