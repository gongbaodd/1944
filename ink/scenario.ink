VAR speaker = "Narrator"
VAR character_name = "Karl Tammik"
VAR Achievement_Karl_First_Fight = false
VAR Achievement_Karl_Story = false
VAR Achievement_Letter = false
VAR Achievement_waffen_ss_count = 0 // 5
VAR Achievement_red_army_count = 0 // 3
VAR Achievement_Aino_Story_count = 0 // 3
VAR Achievement_Juri_Story = false
VAR Achievement_Learn_Tannenberg = false
VAR Achievement_Learn_white_army = false
VAR Achievement_Learn_Estonian_Riflemen = false
VAR Has_Photo = false

Our story starts at the Sinimäe Hills at the Tannenberg line in the end of July 1944..

+ [Start Game] -> Scene_1_Battle

=== Scene_1_Battle ===

# IMAGE: images/Sketch-Scene_1_Battle.png

~ speaker = "Narrator"
~ character_name = "Karl Tammik"
As the game starts, you are Karl Tammik, a young Estonian soldier in a Waffen-SS uniform. Explosions echo. You step out with your comrades, determined to stop the enemies.

+ [Get out of camp] -> Scene_1_Battle_b
+ [Not get out of the camp] -> Scene_1_Battle_bb

=== Scene_1_Battle_b ===

~ speaker = "Radio"
"Believe in the Final Victory!" #audio: audio/propagada.mp3

~ speaker = "Narrator"
Eventually, the bombing stopped, the enemies retreat.

# IMAGE: images/Sketch-Scene_1_Battle_1.png

+ [Continue] -> Scene_1_Battle_bAward

=== Scene_1_Battle_bAward ===
~ speaker = "Narrator"

Achievement: Karl First Fight, You can see your achievements on the top panel

~ Achievement_Karl_First_Fight = true

+ [Continue] -> Scene_2_Inspection

=== Scene_1_Battle_bb ===

~ speaker = "Radio"
"Believe in the Final Victory!" #audio: audio/propagada.mp3

~ speaker = "Narrator"
You heard the bombing stopped, the enemies retreat.

+ [Continue] -> Scene_2_Inspection

=== Scene_2_Inspection ===

# IMAGE: images/Scene_2_Inspection.png

~ speaker = "Narrator"
You stand on a small hill with other soldiers in a line. Your clothes is cleaned for a German commander to inspects the line.

# IMAGE: images/German_Commander.png

# IMAGE: images/Sketch-Scene_2_Inspection-1.png


~ speaker = "Commander"
Heil Hitler! (He hands you a personally signed photo of Hitler.)

# IMAGE: images/Sketch-Scene_2_Inspection-2.png

+ [Take the photo] -> Scene_2b_Order_to_Retreat

+ [Not take the photo] -> Scene_2b_Order_to_Retreat_b

=== Scene_2b_Order_to_Retreat ===

# IMAGE: images/Scene_2b_Order_to_Retreat.png

~ Has_Photo = true

~ speaker = "Commander"
For your victory in Tannenberg you are rewarded with going to Germany!

+ [Back to camp] -> Scene_2c_Camp_Doodle

=== Scene_2b_Order_to_Retreat_b ===

~ speaker = "Commander"
It is your loss, it is signed by Hitler himself! Whatever for your victory in Tannenberg you are rewarded with going to Germany!

+ [Back to camp] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle ===

# IMAGE: images/Scene_2c_Camp_Doodle.png

# IMAGE: images/Sketech-Scene_2c_Camp_Doodle.png.png

# IMAGE: images/Sketch-Scene_2c_Camp_Doodle.png

~ speaker = "Narrator"
In the camp, you are drinking at a table in the camp with your waffen SS soldiers. Drag the background can click the information tag to chat.


* [Talk to Piir] -> Scene_2c_Camp_Doodle_e
* [Talk to Kamenski] -> Scene_2c_Camp_Doodle_a
* [Talk to Sainas] -> Scene_2c_Camp_Doodle_b
* [Talk to comrad C] -> Scene_2c_Camp_Doodle_c
* [Talk to comrad D] -> Scene_2c_Camp_Doodle_d
+ [Learn about the Battle of Tannenberg Line] -> Scene_2_learn
+ {Achievement_waffen_ss_count < 5}[Next day] -> Scene_3_Truck_Refugees
+ {Achievement_waffen_ss_count > 4}[Next day] -> Scene_2c_Camp_Doodle_awards

=== Scene_2c_Camp_Doodle_awards ===

Achievement: talk to Waffen SS soldiers

+ [Next Day] -> Scene_3_Truck_Refugees

=== Scene_2c_Camp_Doodle_e ===
~ speaker = "Piir"
~ Achievement_waffen_ss_count += 1
This photo is Erika, my fiance. We met in Tartu. {Has_Photo: Who need Hitler's photo? Having her is enough.}

+ [Back to others] -> Scene_2c_Camp_Doodle
+ {Has_Photo}[Draw a doodle on the Hitler photo] -> Scene_2c_Camp_Doodle_ea

=== Scene_2c_Camp_Doodle_ea ===

~ speaker = "Narrator"

You draw a doodle on the Hitler's photo, everyone laughs

+ [Back to others] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle_a ===

~ speaker = "Kamenski"
~ Achievement_waffen_ss_count += 1
This Medal is the only thing from my father, it was for the WWI, he fought for the white army. After 1940, the ref army excuted him.

+ [Back to others] -> Scene_2c_Camp_Doodle
+ [Learn about the White Army] -> Scene_2c_White_Army

=== Scene_2c_White_Army ===
~ Achievement_Learn_white_army = true
The White Army, also known as the White Guard, the White Guardsmen, or simply the Whites, was a common collective name for the armed formations of the White movement and anti-Bolshevik governments during the Russian Civil War. They fought against the Red Army of Soviet Russia.

+ [Back] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle_b ===
~ speaker = "Sainas"
~ Achievement_waffen_ss_count += 1
This is not our war, we did not start it. Hitler attacked Russia then it started. He also invade Poland.

+ [Back to others] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle_c ===
~ speaker = "Comrad_c"
~ Achievement_waffen_ss_count += 1
This is all because of Russia. Who invade Finland? And who occupied the Baltic States? They also occupied Poland.

+ [Back to others] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle_d ===
~ speaker = "Comrad_d"
~ Achievement_waffen_ss_count += 1
Do you know what will happen next if we leave? The Red Army will come to our home! They are millions, they will send everyone to Siberia.

+ [Back to others] -> Scene_2c_Camp_Doodle

=== Scene_2_learn ===
~ Achievement_Learn_Tannenberg = true
Battle of Tannenberg Line (1944 Jul 25 - Aug 10)
The Battle of Tannenberg Line, fought from 25 July to 10 August 1944, was a significant military engagement between the German Army Detachment Narwa and the Soviet Leningrad Front, centered on the strategically vital Narva Isthmus.
 The battle ultimately resulted in significant casualties on both sides, with estimates suggesting around 170,000 Soviet casualties and approximately 10,000 German casualties by the end of the engagement. The fighting at the Tannenberg Line exemplified the brutal nature of the Eastern Front during World War II, characterized by relentless assaults and fierce resistance.
 
 + [Do a quiz] -> Scene_2_learn_quiz
 
=== Scene_2_learn_quiz ===

Where did the Battle of Tannenberg happened?

* [Jõhvi] -> Scene_2_learn_quiz
* [Sinimäe Hills] -> Scene_2_learn_award
* [Lake Ülemiste] -> Scene_2_learn_quiz
* [Saaremaa] -> Scene_2_learn_quiz

=== Scene_2_learn_award ===

Achievement: Learn Tannenberg battle

+ [Back to others] -> Scene_2c_Camp_Doodle

=== Scene_3_Truck_Refugees ===

# IMAGE: images/Scene_3_Truck_Refugees.png

~ speaker = "Narrator"
You are sitting in the back of a truck, retreating. A group of local villagers fleeing with their belongings, some with orphans. Suddenly, a fighter plane bombs the ground nearby.

+ [Help the villagers] -> Scene_3_Truck_Refugees_a
+ [Not help the villagers] -> Scene_3_Truck_Refugees_b

=== Scene_3_Truck_Refugees_a ===

~ speaker = "Soldier"
We should give the truck to the villagers! They need it more. And we should ambush here protect them.

+ [Agree] -> Scene_4_Ambush

=== Scene_3_Truck_Refugees_b ===

~ speaker = "Soldier"
They are attacking civilians. We need to fight back, who knows what will happen when they go further.

+ [Agree] -> Scene_4_Ambush

=== Scene_4_Ambush ===

# IMAGE: images/Scene_4_Ambush.png

~ speaker = "Narrator"
You set yourself for the ambush. You hold a letter on your hand, this is the letter for your sister.  And see Tanks in the distant horizon. The fight begins.

# IMAGE: images/Scene_4_Ambush-1.png

+ [Start Shooting] -> Scene_4_Ambush_a
+ [Use the telescope] -> Scene_4_Ambush_a

=== Scene_4_Ambush_a ===

~ speaker = "Red Army Soldier"
"They are Estonians! Stop!"

# IMAGE: images/Scene_4_Ambush-2.png

~ speaker = "Narrator"
The battle suddenly ends, but you are shot. You see another young Estonian man standing in front of you, astonished.

~ Achievement_Karl_Story = true

+ [The screen fades to black.] -> Scene_5_Switch_Roles

=== Scene_5_Switch_Roles ===

# IMAGE: images/Juri.png

~ speaker = "Narrator"
~ character_name = "Jüri Jõgi"
You are now Jüri Jõgi, dressed in a Red Army uniform. 

~ speaker = "Soldier"
There are fascist ambushing!

+ [You shot the first guy in your eyesight.] -> Scene_5_Switch_Roles_b 
+ [You head out of your tank] -> Scene_5_Switch_Roles_b

=== Scene_5_Switch_Roles_b ===

~ speaker = "Red Army Soldier"
"They are Estonians! Stop!"

~ speaker = "Narrator"
You see the young Estonian you shot (Karl) lying on the ground.

+ [Retrieve the letter from Karl] -> Scene_5b_The_Letter
+ [Ignore the letter] ->  Scene_6_Graves_Tallinn

=== Scene_5b_The_Letter ===

# IMAGE: images/Scene_5b_The_Letter.png

~ speaker = "Jüri"
The rest of the Waffen SS soldiers ran away. I should send this letter to Karl's sister.

~ Achievement_Letter = true

+ [Continue] -> Scene_6_Graves_Tallinn

=== Scene_6_Graves_Tallinn ===

# IMAGE: images/Scene_6_Graves_Tallinn.png

~ speaker = "Narrator"
You are digging graves for the dead.

* [Talk to Prohhor] -> Scene_6_Graves_Tallinn_a
* [Talk to comrad B] -> Scene_6_Graves_Tallinn_b 
* [Talk to comrad C] -> Scene_6_Graves_Tallinn_c 
* {not Achievement_Letter}[Talk to comrad D] -> Scene_6_Graves_Tallinn_d 
+ [Next scene] -> Scene6_Kapten_Evald_Viires

=== Scene_6_Graves_Tallinn_a ===

~ speaker = "Prohhor"
~ Achievement_red_army_count += 1
My grandma Maria is Estonian. I used to be a hunter in Sibria. Where do these people go? If not died, these people will be labeled and send to Gulag.

+ [Talk to others] -> Scene_6_Graves_Tallinn
+ [Learn about Gulag] -> Scene_6_Gulag

=== Scene_6_Gulag ===

The Gulag was a system of forced labor camps in the Soviet Union. The word Gulag originally referred only to the division of the Soviet secret police that was in charge of running the forced labor camps from the 1930s to the early 1950s during Joseph Stalin's rule, but in English literature the term is popularly used for the system of forced labor throughout the Soviet era.

+ [Go back] -> Scene_6_Graves_Tallinn_a

=== Scene_6_Graves_Tallinn_b ===

~ speaker = "comrad B"
~ Achievement_red_army_count += 1
This is my family. We took the photo in Parnu, before the war. I really hope they are safe.

+ [Talk to others] -> Scene_6_Graves_Tallinn

=== Scene_6_Graves_Tallinn_c ===

~ speaker = "comrad C"
~ Achievement_red_army_count += 1
I come from Sõrve. I also finght in the rafle unit for the independence war. Somehow, after few months, our unit yield, right now, I stood on the red army side. Then the war begin.

+ [Talk to others] -> Scene_6_Graves_Tallinn


=== Scene_6_Graves_Tallinn_d ===

~ speaker = "comrad D"
Oh, this guy's name is Karl Tammik, you from your town. May be you can send his letter.

~ Achievement_Letter = true

+ [Retrieve the letter] -> Scene_6_Graves_Tallinn

=== Scene6_Kapten_Evald_Viires ===

~ speaker = "Kapten Evald Viires"
Why are you so slowly? we have to get to Tallinn Fast!

# IMAGE: images/Scene_6_Graves_Tallinn-1.png

+ [Continue to Tallinn] -> Scene_6_Tallinn

=== Scene_6_Tallinn ===

~ speaker = "Narrator"
You arrived Tallinn. You can see St. Olaf's Church in the morning Fog.

+ {Achievement_Letter}[Find Aino] -> Scene_7_Aino
+ {not Achievement_Letter}[Meet Captain] -> Scene_8_Viires_Threat

=== Scene_7_Aino ===

# IMAGE: images/Scene_7_Aino.png

~ speaker = "Narrator"
You are in Tallinn, standing in front of a door with Karl's letter. A woman answers. This is Aino, Karl's sister.

# IMAGE: images/aino.png

~ speaker = "Aino"
You were with Karl? What happened?

~ speaker = "Jüri"
I'm a friend of his. He asked me to deliver this. 

+ [You hand her the letter.] -> Scene_7_Aino_b

=== Scene_7_Aino_b ===

# IMAGE: images/Scene_7_Aino-1.png

~ speaker = "Aino"
Aino tells you about Karl and her views on the war. 

* [I met your husband in the front line, pointing Karl's envelope] -> Scene_7_Aino_ba
* [You walk and see a book shelf] -> Scene_7_Aino_bb
* [Is the theatre ruined by Germans?] -> Scene_7_Aino_bc
+ [Leave Aino's house] -> Scene_8_Viires_Threat

=== Scene_7_Aino_ba ===

~ speaker = "Aino"
~ Achievement_Aino_Story_count += 1
Karl is my brother, I am not married.

+ [go back] -> Scene_7_Aino_b

=== Scene_7_Aino_bb ===
~ speaker = "Aino"
~ Achievement_Aino_Story_count += 1
This apartment is not mine, My uncle's. Two weeks ago, they fleed to sweden.

+ [go back] -> Scene_7_Aino_b

=== Scene_7_Aino_bc ===

~ speaker = "Aino"
~ Achievement_Aino_Story_count += 1

March the 9th. The red army did it. There are only woman, children and old man here. All the men were in the front.

+ [go back] -> Scene_7_Aino_b

=== Scene_8_Viires_Threat ===

# IMAGE: images/Scene_8_Viires_Threat.png

~ speaker = "Narrator"
{Achievement_Letter: You have just left Aino's house.} You meet your Soviet Commander, Kapten Evald Viires.

~ speaker = "Kapten Evald Viires"
{Achievement_Letter: I saw you talking to that woman. Who is she? Are you making connections with Fascists?}
{not Achievement_Letter: You used to live here, do you have any conections with Fascists?}

* [I do not know any Fascists] -> Viires_Reaction
* [I only know my comrads] -> Viires_Reaction

=== Viires_Reaction ===

# IMAGE: images/Viires_Reaction.png

~ speaker = "Kapten Evald Viires"
Consider this a warning. You will not associate with fascist sympathizers. Now, take your team to Saaremaa.

+ [Follow the order to Saaremaa] -> Scene_9_Saaremaa_Home

=== Scene_9_Saaremaa_Home ===

# IMAGE: images/Scene_9_Saaremaa_Home.png

~ speaker = "Narrator"
You are on Saaremaa island with another soldier, in front of a small wooden house.

* [Talk to soldier 1] -> Scene_9_Saaremaa_Home_a
* [Talk to Prohhor] -> Scene_9_Saaremaa_Home_b
+ [Keep going] -> Scene_9_Saaremaa_Home_c

=== Scene_9_Saaremaa_Home_a ===

~ speaker = "Soldier 1"
This is my home. My family must have fled to Germany.

+ [go back] -> Scene_9_Saaremaa_Home

=== Scene_9_Saaremaa_Home_b ===

~ speaker = "Prohhor"
Look at this poor shack. My grandma used to told me they lived small, but not this small.

+ [go back] -> Scene_9_Saaremaa_Home

=== Scene_9_Saaremaa_Home_c ===

~ speaker = "Narrator"
You hear shouting about catching a troop.

+ [Investigate the shouting] -> Scene_10_The_Stream

=== Scene_10_The_Stream ===

# IMAGE: images/Scene_10_The_Stream.png

~ speaker = "Narrator"
You are near a stream where some children were crossing it carefully. Seeing your team they yield. The Soviet Commander is walks forward.

~ speaker = "Kapten Evald Viires"
Shoot them! Now!


+ [No! I don't to shoot children!] -> Scene_10_The_Stream_refuse
+ [You pull the gun out but can't push the trigger] -> Scene_10_The_Stream_refuse

=== Scene_10_The_Stream_refuse ===

# IMAGE: images/Scene_10_The_Stream-1.png

~ speaker = "Kapten Evald Viires"
I know you will betray!

+ {Achievement_Letter} [Kapten Evald Viires shot Juri. Fade to black.] -> Ending_Scene
+ {not Achievement_Letter} [Kapten Evald Viires shot Juri. Fade to black.] -> Conclusion

=== Ending_Scene ===

# IMAGE: images/Ending_Scene.png

~ speaker = "Narrator"
~ character_name = ""
(3rd person view) Aino opens the door at the orphan house. A man gives her a letter. It is the letter from Jüri.

+ [Click to read the letter] -> Conclusion

=== Conclusion ===
~ speaker = "Narrator"
~ Achievement_Juri_Story= true
These are your achievements
{Achievement_Karl_First_Fight: First fight}
{Achievement_Karl_Story: Karl's Story}
{Achievement_waffen_ss_count == 5: Know all of Karl's comrads}
{Achievement_Letter: Send the letter}
{Achievement_red_army_count == 3: Know all of Juri's comrads}
{Achievement_Aino_Story_count == 3: Aino's story}
{Achievement_Juri_Story: Juri's story}
{Achievement_Learn_Tannenberg: Learn Tannenberg}
{Achievement_Learn_white_army: Learn White Army}
The END

-> END