---
title: "Markdown Styleguide for Posts"
date: "2100-01-01"
subtitle: "Reference and documentation to ensure you know what formatting to use where."
category: "other"
image: 'images/blog/tech/how-to-configure-azure-b2c-with-nextjs/azure-b2c-next-js-config-title-image-2x1.jpg'
---

![Initial image used as anchor for article](https://cdn-images-1.medium.com/max/3200/1*fOLLMlLkYKS72dBihyBBdQ.png)

The content in the markdown file header is parsed by `gray-matter` and used in various places:
```text
---
title:    Used in meta tags, and added to post JSX outside of markdown transfomration
date:     Added to post JSX outside of markdown transfomration
subtitle: Used in meta tags, and added to post JSX outside of markdown transfomration
category: Used in constructing post URL
image:    Used in meta tags
canon:    Can be used to specify a canonical link, if originally published elsewhere
---
```

## Section Title <!-- omit in toc -->

Section Titles (`##`) are the highest-level heading in the body of the post. The only higher heading is the post title (equivalent to `#`).

Body content is nothing special, any [links in the body content](#) are straight forward. They can be [relative links](/blog/drafts) or [external links](http://www.google.com) (parsed by remark-external-links and differentiated by specifying http/https).

## Table of Contents <!-- omit in toc -->

The ToC should link to Section Titles. This can be auto-generated using the "Markdown All in One" extension. Additional links are wired up using packages `remark-slug` and `remark-autolink-headings` a comment (<!-- no_toc --> but remove the underscore) can also be added to remove the TOC.
1. [Important Section](#important-section)
   1. [Section SubHead](#section-subhead)
      1. [Distinct SubHead Content](#distinct-subhead-content)
         1. [Level 5 Heading](#level-5-heading)
            1. [Level 6 Heading](#level-6-heading)
1. [Various Formatting Elements](#various-formatting-elements)
      1. [A list](#a-list)
      1. [A block quote](#a-block-quote)
      1. [A code block](#a-code-block)
      1. [Images](#images)
1. [Some Other Section](#some-other-section)
   1. [Section SubHeading](#section-subheading)
      1. [Other Callout](#other-callout)

## [Important Section](#important-section)

Another primary distinct section within the post.

### [Section SubHead](#section-subhead)

A section sub-head (`###`) is a distinct unit of content within the context of the parent section. This can be further divided as needed, into additional headings:

#### [Distinct SubHead Content](#distinct-subhead-content)
(`####`) Again, a distinct unit of content that relates most directly to the parent subhead. This heading is the same `font-size` as the body content. In the editor, paragraph text doesn't *need* a return following the heading. But it does make it easier to read.

##### [Level 5 Heading](#level-5-heading)

Smaller headings (`#####`) . This should rarely be used. Smaller `font-size` than body content.

###### [Level 6 Heading](#level-6-heading)

Smallest heading (`######`) . Also rarely, if ever, used. Smaller `font-size` than body content.

## [Various Formatting Elements](#various-formatting-elements)

#### [A list](#a-list)
With various bullets and indentations:
- Item 1
- Item 2
  - Item 2.1
    - Item 2.1.1
- Item 3
  1. Numbers
  2. Second
     1. Indented
  3. Third

#### [A block quote](#a-block-quote)
> For no reason at 4 am nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws so touch water with paw then recoil in horror. Purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table x sitting in a box yet eat plants, meow, and throw up because i ate plants or curl into a furry donut.
>  
> -- *Some Individual*

#### [A code block](#a-code-block)
Formatted as JavaScript:
```javascript
/**
 * This will rebuild the entire post for the passed slug. Used in
 * developmenet only.
 *
 * @param {array} slug an array containing the path parts & post name
 */
const rebuildContentForPost = (slug) => {
  if (isDraftPost(slug)) {
    return makePost(`content/${slug[0]}/${slug[1]}`, `${slug[2]}.md`, postStatuses.draft)
  }

  return makePost(`content/published/${slug[0]}`, `${slug[1]}.md`, postStatuses.published)
}
```

#### [Images](#images)
![Alt text here.](/public/images/blog/tech/how-to-configure-azure-b2c-with-nextjs/azure-b2c-next-js-config-title-image-2x1.jpg)
*Images can be linked including the `/public` prefix (to display in IDE preview) if desired. This will be removed by custom plugin remark-remove-next-image-public-path*

Mice attack dog, run away and pretend to be victim and twitch tail in permanent irritation meow meow. Cereal boxes make for five star accommodation curl up and sleep on the freshly laundered towels but cats making all the muffins so hide head under blanket so no one can see. Loves cheeseburgers get scared by doggo also cucumerro.

Sit on human they not getting up ever meow meow find a way to fit in tiny box. I see a bird i stare at it i meow at it i do a wiggle come here birdy thinking longingly about tuna brine for plan steps for world domination yet cats woo so get suspicious of own shadow then go play with toilette paper sleep on dog bed, force dog to sleep on floor.

## [Some Other Section](#some-other-section)
Run at 3am yowling nonstop the whole night. My cat stared at me he was sipping his tea, too cry louder at reflection that box? i can fit in that box so chew the plant, slap owner's face at 5am until human fills food dish and pee in the shoe. My slave human didn't give me any food so i pooped on the floor side-eyes your "jerk" other hand while being petted or give me some of your food give me some of your food give me some of your food meh, i don't want it. Step on your keyboard while you're gaming and then turn in a circle experiences short bursts of poo-phoria after going to the loo or yowling nonstop the whole night for run outside as soon as door open. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats hey! you there, with the hands i show my fluffy belly but it's a trap! if you pet it i will tear up your hand, or poop on grasses dream about hunting birds but behind the couch, but let me in let me out let me in let me out let me in let me out who broke this door anyway.

### [Section SubHeading](#section-subheading)
Meow meow spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce this human feeds me, i should be a god, meow all night, yet hiss at vacuum cleaner yet sit on the laptop. When owners are asleep, cry for no apparent reason claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? or cat milk copy park pee walk owner escape bored tired cage droppings sick vet vomit, so purr so immediately regret falling into bathtub claws in the eye of the beholder i is not fat, i is fluffy.

Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats hey! you there, with the hands i show my fluffy belly but it's a trap! if you pet it i will tear up your hand, or poop on grasses dream about hunting birds but behind the couch, but let me in let me out let me in let me out let me in let me out who broke this door anyway.

Run at 3am yowling nonstop the whole night. My cat stared at me he was sipping his tea, too cry louder at reflection that box? i can fit in that box so chew the plant, slap owner's face at 5am until human fills food dish and pee in the shoe. My slave human didn't give me any food so i pooped on the floor side-eyes your "jerk" other hand while being petted or give me some of your food give me some of your food give me some of your food meh, i don't want it. Step on your keyboard while you're gaming and then turn in a circle experiences short bursts of poo-phoria after going to the loo or yowling nonstop the whole night for run outside as soon as door open. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats hey! you there, with the hands i show my fluffy belly but it's a trap! if you pet it i will tear up your hand, or poop on grasses dream about hunting birds but behind the couch, but let me in let me out let me in let me out let me in let me out who broke this door anyway.

#### [Other Callout](#other-callout)
Pretend you want to go out but then don't skid on floor, crash into wall the fat cat sat on the mat bat away with paws yowling nonstop the whole night adventure always chew foot. Get scared by sudden appearance of cucumber check cat door for ambush 10 times before coming in go crazy with excitement when plates are clanked together signalling the arrival of cat food, catching very fast laser pointer commence midnight zoomies and tweeting a baseball chew the plant.

Meow meow spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce this human feeds me, i should be a god, meow all night, yet hiss at vacuum cleaner yet sit on the laptop. When owners are asleep, cry for no apparent reason claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? or cat milk copy park pee walk owner escape bored tired cage droppings sick vet vomit, so purr so immediately regret falling into bathtub claws in the eye of the beholder i is not fat, i is fluffy.

Run at 3am yowling nonstop the whole night. My cat stared at me he was sipping his tea, too cry louder at reflection that box? i can fit in that box so chew the plant, slap owner's face at 5am until human fills food dish and pee in the shoe. My slave human didn't give me any food so i pooped on the floor side-eyes your "jerk" other hand while being petted or give me some of your food give me some of your food give me some of your food meh, i don't want it. Step on your keyboard while you're gaming and then turn in a circle experiences short bursts of poo-phoria after going to the loo or yowling nonstop the whole night for run outside as soon as door open. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats hey! you there, with the hands i show my fluffy belly but it's a trap! if you pet it i will tear up your hand, or poop on grasses dream about hunting birds but behind the couch, but let me in let me out let me in let me out let me in let me out who broke this door anyway.