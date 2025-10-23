---
title: "Dates"
title_zh: "日期"
bg: '#fde0e0'
color: logo_purple2
style: center
fa-icon: calendar
published: true
---


{::options parse_block_html="true" /}

<div class="lang-en">


# Key Dates


<br>

{% if site.cfp_date %}
### Speech Proposal Submission Deadline
{{ site.cfp_date }}

<br>

{% endif %}
{% if site.workshop_submission_deadline %}
### Workshop Proposal Submission Deadline
{{ site.workshop_submission_deadline }}
{% endif %}

<br>

{% if site.diversity_application_deadline %}
### Light Speech Proposal Submission Deadline
{{ site.diversity_application_deadline }}
{% endif %}

<br>

</div>


<div class="lang-zh" style="display: none;">



# 重要日期


<br>

{% if site.cfp_date_zh %}
### 演讲提案提交截止日期
{{ site.cfp_date_zh }}

<br>

{% endif %}
{% if site.workshop_submission_deadline_zh %}
### 研讨会提案提交截止日期
{{ site.workshop_submission_deadline_zh }}
{% endif %}

<br>

{% if site.diversity_application_deadline_zh %}
### 闪电演讲提案提交截止日期
{{ site.diversity_application_deadline_zh }}
{% endif %}

<br>



</div>



{% comment %}

{% if site.submission_deadline %}
### Proposal submission deadline
{{ site.submission_deadline }}
{% endif %}

<br>

{% if site.acceptance_date %}
### Proposal acceptance notification
{{ site.acceptance_date }}
{% endif %}

<br>

{% if site.early_registration_deadline %}
### Early registration deadline
{{ site.early_registration_deadline }}
{% endif %}

<br>

{% if site.late_registration_start %}
### Late registration starts
{{ site.late_registration_start }}
{% endif %}

<br>

{% endcomment %}