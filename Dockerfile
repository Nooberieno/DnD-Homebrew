FROM ruby:3.3

WORKDIR /site

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 4000

CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]