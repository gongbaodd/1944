VAR speaker = "writer"
VAR character_name = "Haotian"

Our story starts at the Sinimäe Hills at the Tannenberg line in 1944..

+ [Start Game] -> Scene_1_Battle

=== Scene_1_Battle ===

# IMAGE: images/Sketch-Scene_1_Battle.png

~ speaker = "Narrator"
~ character_name = "Karl Tammik"
As the game starts, you are Karl Tammik, a young Estonian soldier in a Waffen-SS uniform. Explosions echo. You step out with your comrades, determined to stop the enemies.

+ [Get out of camp] -> Scene_1_Battle_b

=== Scene_1_Battle_b ===

~ speaker = "Radio"
"Believe in the Final Victory!" #audio: audio/propagada.mp3

~ speaker = "Narrator"
Eventually, the bombing stopped, the enemies retreat.

# IMAGE: images/Sketch-Scene_1_Battle_1.png

+ [Celebrate with your comrades] -> Scene_2_Inspection

=== Scene_2_Inspection ===

# IMAGE: images/Scene_2_Inspection.png

~ speaker = "Narrator"
You stand on a small hill with other soldiers in a line. Your clothes is cleaned for a German commander (Omavalitsuse Tegelane) to inspects the line.

# IMAGE: images/Sketch-Scene_2_Inspection-1.png


~ speaker = "Commander"
Heil Hitler! (He hands you a personally signed photo of Hitler.)

# IMAGE: images/Sketch-Scene_2_Inspection-2.png

+ [Take the photo] -> Scene_2b_Order_to_Retreat

=== Scene_2b_Order_to_Retreat ===

# IMAGE: images/Scene_2b_Order_to_Retreat.png

~ speaker = "Commander"
For your victory in Tannenberg you are rewarded with going to Germany!

+ [Back to camp] -> Scene_2c_Camp_Doodle

=== Scene_2c_Camp_Doodle ===

# IMAGE: images/Scene_2c_Camp_Doodle.png

# IMAGE: images/Sketech-Scene_2c_Camp_Doodle.png.png

# IMAGE: images/Sketch-Scene_2c_Camp_Doodle.png

~ speaker = "Narrator"
Later that night, you are drinking at a table in the camp with your comrades. They have conflicting views on the war. You can examine them and read their stories. You also have the photo of Hitler.

+ [Draw a doodle on the Hitler photo] -> Scene_3_Truck_Refugees

=== Scene_3_Truck_Refugees ===

# IMAGE: images/Scene_3_Truck_Refugees.png

~ speaker = "Narrator"
You are sitting in the back of a truck, retreating. Your companion next to you is complaining.

~ speaker = "Companion"
Why should we leave for Germany? We should just stay here, fight for our country.

~ speaker = "Narrator"
You see a group of local villagers fleeing with their belongings, some with orphans. Suddenly, a fighter plane bombs the ground nearby.

~ speaker = "Soldier"
We should give the truck to the villagers! They need it more.

+ [Give the truck to the fleeing villagers] -> Scene_4_Ambush

=== Scene_4_Ambush ===

# IMAGE: images/Scene_4_Ambush.png

~ speaker = "Narrator"
You are walking with your team in the countryside. You see a couple on the road offers you with food. The soldiers talk about ambushing the Red Army. 

You set yourself for the ambush. and see Tanks in the distant horizon. The fight begins.

# IMAGE: images/Scene_4_Ambush-1.png

~ speaker = "Red Army Soldier"
"They are Estonians! Stop!"

# IMAGE: images/Scene_4_Ambush-2.png

~ speaker = "Narrator"
The battle suddenly ends, but you are shot. You see another young Estonian man standing in front of you, astonished.

+ [The screen fades to black.] -> Scene_5_Switch_Roles

=== Scene_5_Switch_Roles ===

# IMAGE: images/Scene_5_Switch_Roles.png

~ speaker = "Narrator"
~ character_name = "Jüri Jõgi"
You are now Jüri Jõgi, dressed in a Red Army uniform. You hear shouts about finding Nazi soldiers. 

+ [You shot the first guy in your eyesight.] -> Scene_5_Switch_Roles_b 

=== Scene_5_Switch_Roles_b ===

~ speaker = "Red Army Soldier"
"They are Estonians! Stop!"

~ speaker = "Narrator"
You see the young Estonian you shot (Karl) lying on the ground.

+ [Retrieve the letter from Karl's top pocket] -> Scene_5b_The_Letter

=== Scene_5b_The_Letter ===

# IMAGE: images/Scene_5b_The_Letter.png

~ speaker = "Jüri"
The rest of the Waffen SS soldiers ran away. I should send this letter to Karl's sister.

+ [Continue] -> Scene_6_Graves_Tallinn

=== Scene_6_Graves_Tallinn ===

# IMAGE: images/Scene_6_Graves_Tallinn.png

~ speaker = "Narrator"
You are digging graves for the dead. Kapten Evald Viires is criticizing your team for letting the enemy run.

Afterwards, while on the road, you see the couple Karl met; the Red Army hides their identity.

~ speaker = "Driver"
(In Russian) Hurry up! We must get to Tallinn!

# IMAGE: images/Scene_6_Graves_Tallinn-1.png

~ speaker = "Narrator"
The couple's faces turn from happiness to fear. It seems that the Red Army is not welcome here.

+ [Continue to Tallinn] -> Scene_7_Aino

=== Scene_7_Aino ===

# IMAGE: images/Scene_7_Aino.png

~ speaker = "Narrator"
You are in Tallinn, standing in front of a door with Karl's letter. A woman answers. This is Aino, Karl's sister.

~ speaker = "Aino"
You were with Karl? What happened?

~ speaker = "Jüri"
I'm a friend of his. He asked me to deliver this. 

+ [You hand her the letter.] -> Scene_7_Aino_b

=== Scene_7_Aino_b ===

# IMAGE: images/Scene_7_Aino-1.png

~ speaker = "Aino"
(Aino tells you about Karl and her views on the war. You can click around the room, seeing the ruined Tallinn Theatre outside the window.)

+ [Leave Aino's house] -> Scene_8_Viires_Threat

=== Scene_8_Viires_Threat ===

# IMAGE: images/Scene_8_Viires_Threat.png

~ speaker = "Narrator"
You have just left Aino's house. You meet your Soviet Commander, Kapten Evald Viires.

~ speaker = "Kapten Evald Viires"
I saw you talking to that woman. Who is she? Are you making connections with Fascists?

* [Lie about your connection to Aino] -> Viires_Reaction
* [Tell the truth about Aino] -> Viires_Reaction

=== Viires_Reaction ===

# IMAGE: images/Viires_Reaction.png

~ speaker = "Kapten Evald Viires"
Consider this a warning. You will not associate with fascist sympathizers. Now, take your team to Saaremaa.

+ [Follow the order to Saaremaa] -> Scene_9_Saaremaa_Home

=== Scene_9_Saaremaa_Home ===

# IMAGE: images/Scene_9_Saaremaa_Home.png

~ speaker = "Narrator"
You are on Saaremaa island with another soldier, in front of a small wooden house.

~ speaker = "Soldier 1"
This is my home. My family had to flee to Germany.

~ speaker = "Soldier 2"
Look at this poor shack. You call this a home?

~ speaker = "Narrator"
You hear shouting about catching a troop.

+ [Investigate the shouting] -> Scene_10_The_Stream

=== Scene_10_The_Stream ===

# IMAGE: images/Scene_10_The_Stream.png

~ speaker = "Narrator"
You are near a stream where some children were crossing it carefully. Seeing your team they yield. The Soviet Commander is walks forward.

~ speaker = "Kapten Evald Viires"
Shoot them! Now!

~ speaker = "Jüri"
No! I don't to shoot children!

# IMAGE: images/Scene_10_The_Stream-1.png

~ speaker = "Narrator"
Jüri is shot for refusing the order.

+ [Fade to black.] -> Ending_Scene

=== Ending_Scene ===

# IMAGE: images/Ending_Scene.png

~ speaker = "Narrator"
(3rd person view) Aino opens the door at the orphan house. A man gives her a letter. It is the letter from Jüri.

+ [Click to read the letter] -> Conclusion

=== Conclusion ===
~ speaker = "writer"
The END

-> END