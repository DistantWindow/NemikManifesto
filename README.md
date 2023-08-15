# NemikManifesto
Portable fork of Nemik's Manifesto firmware by the.rebel.agent

Originally developed by The.Rebel.Agent on the RPF - https://www.therpf.com/forums/threads/nemik%E2%80%99s-manifesto-andor.349301/post-5393276

Portable version made for running on an android phone via a local web server; allows for operation on a device in airplane mode to save battery and for use when internet connection is not available.

Default version is the 1.1 firmware created by the.rebel.agent, made offline by caching all files locally and adjusting source to point to the local audio files

Inlined version is my fork with additional changes and new features:

- Moved CSS and scripts inline with HTML for maximum compatibilty with weird Android file system restrictions

- Removed aurabesh font from setup.html so I could read the buttons and reworded a couple prompts

- Added blinking squares below where the LEDs sit on the datapad face so that the lights can illuminate. Tap the second symbol above the LEDs to change the pattern between random flashing, steady on, and off.
  - Random flashing cycles the top light semi-rapidly between red, green, white, and black to provide a variety of different illumination levels
  - The bottom light flashes more slowly only between red and black.
  - The lights don't seem to actually blink in the show, but personally I didn't like them just sitting there.
  - Tapping the second symbol to change the pattern requires a second or two to take effect since the flash needs to move to its next position.

- Added a volume control. If the text animation is paused, tapping the first symbol will reload the page. If it is running, tapping this symbol will cycle the volume between muted, 20%, 40%, 60%, 80%, and 100%.
  - Allows for silent running of the rest of the animations without having to remove the phone from the datapad to adjust the volume.
