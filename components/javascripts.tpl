<script src="{{ javascripts_path }}/jquery.js?1"></script>
<script src="{{ javascripts_path }}/steady.js?1"></script>
<script src="{{ javascripts_path }}/main.js?1"></script>
<script src="{{ javascripts_path }}/retina.js?1"></script>
<script src="{{ javascripts_path }}/placeholder.js?1"></script>
<script src="{{ javascripts_path }}/formPlaceholders.js?1"></script>
<script src="{{ javascripts_path }}/overthrow.js?1"></script>
<script src="{{ site.static_asset_host }}/libs/picturefill/1.0.0/picturefill.min.js"></script>
{% if site.search.enabled %}
<script src="{{ site.static_asset_host }}/libs/edicy-search/1.0.0/edicy-search.js"></script>
<script src="{{ javascripts_path }}/search.js"></script>
<script>

  $(function() {
    var search = new VoogSearch($('.js-search-form'), {
      per_page: 3,
      lang: '{{ page.language_code }}',
      noResults: '{{ "search_noresults"|lc }}',
      minChars: 2,
      searchOnType: true
    });

    var mobilesearch = new VoogSearch($('.js-mobile-search-form'), {
      per_page: 3,
      lang: '{{ page.language_code }}',
      noResults: '{{ "search_noresults"|lc }}',
      $parent: $('#mobile-search-results'),
      visibleClass: 'voog-mobile-search-visible',
      closeOnSideClick: false
    });

    $('.mobile-search-toggler').click(function(event) {
        event.preventDefault();
        var $body = $('body');
        if ($body.hasClass('mobilesearch-open')) {
            $body.removeClass('mobilesearch-open');
            mobilesearch.reset();
        }
        else {
            $('body').addClass('mobilesearch-open');
            $('#mobile-search .search-input').get(0).focus();
        }

    });
  });
</script>
{% endif %}

<script>$('.content form').edicyFormPlaceholders();</script>

{% unless editmode %}{{ site.analytics }}{% endunless %}
