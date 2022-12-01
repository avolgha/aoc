if [ "$#" -ne 1 ]; then
	echo "error: illegal number of script arguments."
	exit 1
fi

day_index="$1"
directory="day$day_index"

if [ -d "$directory" ]; then
	echo "error: this day was already created."
	exit 1
fi

mkdir "$directory"
cd "$directory"

cat << EOF > script.mjs
import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8");
EOF
touch "input.txt"

cd ".."
