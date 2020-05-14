# Hainer Savimaa test project for Allepal 

## Adding dynamic osta.ee id
To add a dynamic id for the page one should add ?id=[OSTA_ITEM_ID] to the end of the URL. For example: 137309101

## About development
The tech stack used for this project: HTML, Vue & SCSS. I also used axios for managing the API request. 
I decided to use Vue for creating the 'viimased oksjonid' component because it is really lightweight and 
fast JS framework which makes state and template handling more easier. I imported Vue via CDN, 
but originally did the whole thing as a vue project, but decided it was a bit of an overkill. I also added error message for 
handling API errors and loading message when the API connection is still ongoing so that the user would be aware of what is happening.
I decided to make an exception for end date aswell:  if no end date is coming through the API I decided to display 'puudub' instead of having an empty place.
I decided to set maximum width of the page container to 1500px because otherwise I felt like the assets(backgrounds) were too pixelated.

## Feedback about design
The biggest thing I noticed about the design was that spacing (headings,sections) and some font sizes (mostly headings) for the same element were different in different sections. 
In my test project I equalized the spacings and sizes in all the sections.
I also changed the design in narrow mobile screens: the auction info in three columns didn't fit when long end_date is present so I decided to wrap price and bidcount to another row. 
If the API doesn't return an end date then 'puudub' will be displayed instead.
And I would've also swapped out the arrow, envelope and phone icons as they seemed to heavy and thick for the design. 

## Feedback about provided assets
I think the provided icons could have been merged into one sprite. For example: envelope, phone and arrow could be on image spreite to avoid having 3 different HTTP requests for these small png images. Also the png-s could've been svgs (and also in sprite) to have better quality images. 
The overall header or hero image could've been provided separately: background and logo. The heading text would've been better to include into the HTML as h1 element. It would've improved the page's SEO, too. Also it would've made life easier for me as a developer to scale the hero section better.
I wish the mockups 'mobile' and 'desktop' would have also included the measures for paddings/margins, font sizes etc. Currently I made it visually as close as possible by eye and basic pixel measurement.
