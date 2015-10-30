

MAXBOARDPOSITION = 30
snake_and_ladder = Hash.new

snake_and_ladder[27] = 1
snake_and_ladder[11] = 26
snake_and_ladder[3] = 22
snake_and_ladder[21] = 9
snake_and_ladder[17] = 4
snake_and_ladder[5] = 8
snake_and_ladder[19] = 7
snake_and_ladder[20] = 29


Player = Struct.new(:name, :position)

a = Player.new("Vimlesh",0)
b = Player.new("Computer",0)
c = Player.new("Rahul",0)

players =[a,b,c]

def throw_dice
	r = Random.new()
	r.rand(1..6)
end


def play_game(players, snake_and_ladder)	
	catch(:done) do
		while true
			players.each{
				|player|
				dice_value = throw_dice
				next_position = player.position + dice_value


				case 
				when  next_position > MAXBOARDPOSITION
					puts(" #{player.name} can't proceed... waiting for #{MAXBOARDPOSITION - player.position}")
				when next_position < MAXBOARDPOSITION
					snl_position = snake_and_ladder[next_position]
					
					player.position = next_position
					if snl_position
						puts(" Gotcha for player #{player.name} @ #{next_position} Moving from #{next_position} -> #{snl_position}")
						next_position = snl_position
						
						player.position = next_position
					# else
					# 	player.position = next_position
					end
					puts(" #{player.name} is at new position #{player.position} and rolled #{dice_value}")

				when next_position == MAXBOARDPOSITION
					player.position = next_position
					puts("#{player.name} is at new position #{player.position} and rolled is #{dice_value} and wins <----")
	                throw :done
				end
			}
			sleep(0.1)
		end
	end
end


play_game(players, snake_and_ladder)