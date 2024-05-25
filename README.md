> Alternate frontend https://share.jasoncameron.dev/

## Inspiration
We stumbled upon a common yet not talked about issue regarding image sharing. Any time you need to ask a friend to share photos with you, they may typically send these photos to you over some social media/messaging app like discord or instagram (or sometimes even email). This is insanity! Images that are shared over these platforms are always heavily compressed, and this means that you are compromising on the quality of these images.

### Well why not Airdrop?
Essentially, Airdrop/Nearby share use either Bluetooth or a local wireless connection which both have their limits. The biggest one is the fact that in order for either of those to work, you must be within a close proximity (100ft or so) of each other. Now if you take p2p, it can work across the whole internet. You can be 1000s of KM away and get faster speeds. 
## What it does
Quicture allows you to create/join "rooms" where you can lossesly share images with your friends over a direct peer-to-peer (p2p) connection. This bypasses the need for a traditional backend which means no storage costs, networking costs & all of the other costly parts of a traditional image sharing platform. Additionally, users have the option to store images temporarily and privately on the cloud in case other users are not available for a peer-to-peer connection. These images are automatically deleted after 7 days.

## How we built it
We used Next.js for the frontend and Sockets.io to establish a peer-to-peer connection within the client. For the backend, we utilized FastAPI to build the API and connected the application to a GCP cloud bucket via the async `gcloud` CLI. (see https://api.sharethephotoswithus.us/docs)

## Challenges we ran into
Pretty much all of our issues were placed around the p2p aspect of the program. Due an initial misunderstanding, we didn't have any progress until the last night.

## Accomplishments that we're proud of
After a tiring debugging session, we were able to nail down the fundamentals of web sockets and track down the appropriate documentation to make sure all declarations/calls were correct.

## What we learned
Throughout this project, we gained valuable experience in working with websockets, deploying applications to cloud platforms, containerization, and using TypeScript.

## What's next for Quicture
The next steps for us would be to implement a lossless compression algorithm to be in use during transit. Along with E2E encryption to make sure everyone is in control of their own data.


# Setup

## Backend

To install the backend's dependencies `cd` into the backend directory, run `pip install poetry`, `poetry install` then `poetry shell` 
after that, to run it, just run `fastapi dev`
