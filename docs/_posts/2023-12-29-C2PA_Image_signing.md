---
layout: post
title:  C2PA_Image_signing
date:   2023-12-29 13:22:57 +0100
---
# Exploring the Potential of Image Signing in Journalism with C2PA

In the evolving world of digital journalism, the integrity of visual content has never been more critical. The C2PA (Coalition for Content Provenance and Authenticity) initiative offers a promising solution to this challenge, particularly through the concept of image signing.
[ Leica ](https://leica-camera.com/en-US/news/partnership-greater-trust-digital-photography-leica-and-content-authenticity-initiative#) is the first camera creator implementing this.

# Extracting private key
This is of course possible, but hard, and might destructive of the camera equipment.
So if we take into consideration that Leica has a root cert in their vault, and mints camera specific certificates based on their Root cert, as well as keep a copy of the public key for verification.
Then if we have the camera and the image, we can say with a reasonable degree of certainty that this image was taken by this image. 

Given that one of the main targets of this initiative is journalism, this does seem like a reasonable effort.
The same framework could be employed by news outlet, moving the responsibility of authenticity over to where it feels most at home.

So if Reuters has a root cert, and signs it's images as well as news articles. It could be an effective tool to stop the spread of fake news from "trustworthy" news sources.
And at that point it would be possible to quickly react to a leak of the cert, by minting a new and resigning known content.

A brief glance at the open source tools for C2PA
https://github.com/contentauth/c2patool
Makes it seem like all of this is possible.

# Reverse engineering of redacted data
I'm not sure if all metadata is part of the signed blob, this is an implementation detail.
Than if the photographer wanted to remove some metadata, say location, I assume we need to keep the original signature. 
This makes it possible to do an "oracle" attack, by brute forcing the data until the signature matches.

For larger amounts of data, like cropping, this is probably unpractical, it being a hash after al.

# Lack of knowledge
If the original signed hash remains after manipulation, the attack posted over could give some journalist the false impression that a latent version of the original data remains.

Given the scenario of blurring the face of a source, if they feel that there is a way to reverse the blurred section, they might not feel comfortable using it.
This will mirror the resistance Apple faced with their Neural Hash CSAM implementation.

# State actors = bets off
State actors are state actors, and that's probably not the threat model CAI handling with this initiative.

# Summary scenario
If "The Times" rotated among their journalist a bunch of Leica cameras, each whit it's own cert, and upon retrieving the images they did their own "stamp of approval", and published it along an article. (They could even link the article and image in metadata)
Then it would in my humble opinion give a strong authentication, and restore some sens of respect and "truth" to our daily lives.

And if Russia got a hold of the cert of Leica or The Times, then it would limit the application of the cert, as once the times sees their cert loose, they can mint a new one. Possibly resigning old articles and images.

Of course Leica's root cert would pose a bigger problem, but still, given that Leica only holds on to the public key, the root cert could still not be used for a collision attack.
