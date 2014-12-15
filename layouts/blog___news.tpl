<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% assign blog_page = true %}
  {% include "edicy-tools-variables" %}
  {% include "html-head" %}
</head>

<body class="blog-page content-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode %} editmode{% endif %}">
  <div class="container" data-search-indexing-allowed="false">
    {% include "header" %}
    <main class="content" role="main">
      <div class="blog-header">
        {% include "tags-blog" %}
        {% if editmode %}<div class="add-post-container">{% addbutton %}</div>{% endif %}
      </div>

      {% for article in articles %}
        <article class="post">
          <header class="post-header">
            <h1 class="post-title"><a href="{{ article.url }}">{{ article.title }}</a></h1>
            <time datetime="{{ article.created_at | date : "%Y-%m-%d" }}" class="post-date">{{ article.created_at | format_date : "%b %d, %Y" }}</time>
          </header>

          <section class="post-content">
            <div class="post-excerpt content-formatted cfx">{{ article.excerpt }}</div>
            <div class="post-body content-formatted cfx">{{ article.body }}</div>
          </section>
        </article>
      {% endfor %}
    </main>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  {% include "edicy-tools" %}
  <script type="text/javascript">site.initBlogPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
