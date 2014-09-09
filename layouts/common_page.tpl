<!DOCTYPE html>
<html class="{% if editmode %}editmode{% else %}public{% endif %}" lang="{{ page.language_code }}">
<head prefix="og: http://ogp.me/ns#">
  {% include "html-head" %}
</head>

<body class="common-page{% if site.search.enabled %} search-enabled{% endif %}{% if editmode %} editmode{% endif %}">
  <div class="container">
    {% include "header" %}
    <section class="content-header content-formatted cfx">
      {% content name="slogan" %}
    </section>
    <main class="content" role="main">
      {% include "sidebar-left" %}
      <section class="content-body content-formatted">{% content %}</section>
    </main>
    {% include "footer" %}
  </div>
  {% include "javascripts" %}
  <script>site.initCommonPage({% if editmode %}false{% else %}true{% endif %});</script>
</body>
</html>
