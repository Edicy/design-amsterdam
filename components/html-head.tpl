<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="keywords" content="{{ page.keywords }}">
<meta name="description" content="{{ page.description }}">
<meta name="author" content="{{ site.author }}">
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->

<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="/favicon.ico" type="image/ico">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="{{ images_path }}/{{ page.data.touchicon }}"> <!-- TODO: Add image location data tag -->

{% stylesheet_link "main.css" %}
<!--[if lt IE 9]>{% stylesheet_link "ie8.css?1" %}<![endif]-->

<script src="{{ javascripts_path }}/modernizr.js?1"></script>
<!-- http://modernizr.com/download/ - Check for updates -->

<title>{% if article %}{{ article.title }} — {{ page.site_title }}{% else %}{% if site.root_item.selected? %}{{ page.site_title }}{% else %}{{ page.title }} — {{ page.site_title }}{% endif %}{% endif %}</title>

<!-- Page specific opengraph tags are located in each page template -->
<meta property="fb:admins" content="XXXXXXXXXX"> <!--Site admin's Facebook user id -->
<!-- http://graph.facebook.com/"username" - Replace "username" with site admin's username to get admin's ID) -->
<meta property="og:type" content="website">
<!-- https://developers.facebook.com/tools/debug - Debug after each modification -->