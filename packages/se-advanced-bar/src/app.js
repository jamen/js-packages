const row = $('<div class="adv-bar"></div>');
$('.topbar .topbar-wrapper').append(row);

let site = null, link = null, icon = null, rep = null, button = null;
$('#your-communities-section .my-sites li').each(function() {
  site = $(this);
  link = site.find('a').attr('href');
  icon = site.find('.site-icon').attr('class');
  rep = site.find('.rep-score').text();

  console.log(link, icon);

  button = $('<a class="adv-bar-button yes-hover topbar-icon"></a>');
  button
    .attr('href', link)
    .attr('title', rep)
    .append(
      $('<div class="adv-bar-icon"></div>')
      .addClass(icon)
    );
  row.append(button);
});

let current = $('.current-site-link').attr('href');

row.find(`.adv-bar-button[href="${current}"]`).addClass('current');

$('.icon-site-switcher').detach().appendTo('.network-items');
