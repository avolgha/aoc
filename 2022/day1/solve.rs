use std::fs;

const INPUT_FILE_PATH: &str = "input.txt";

fn solution_1() -> Result<(), std::io::Error> {
    let content = fs::read_to_string(INPUT_FILE_PATH)?;
    let mut split = content.split('\n');
    let mut sum = 0;
    let mut highest = 0;

    loop {
        let item_ = split.next();

        if let Some(item) = item_ {
            if !item.is_empty() {
                sum += item.parse::<u32>().unwrap();
                continue
            }

            if sum > highest {
                highest = sum;
            }

            sum = 0;
            continue
        }

        break
    }

    println!("Answer (1): \"{}\".", highest);

    Ok(())
}

fn solution_2() -> Result<(), std::io::Error> {
    let content = fs::read_to_string(INPUT_FILE_PATH)?;
    let mut split = content.split('\n');
    let mut sum = 0;
    let mut highest: Vec<u32> = vec![0, 0, 0];

    loop {
        let item_ = split.next();

        if item_ == None {
            break
        }

        if let Some(item) = item_ {
           if !item.is_empty() {
                sum += item.parse::<u32>().unwrap();
                continue
            }

            highest.insert(3, sum);
            highest.sort();
            highest.reverse();
            highest.truncate(3);

            sum = 0;
            continue
        }
    }

    println!("Answer (2): \"{}\".", highest.iter().sum::<u32>());

    Ok(())
}

fn main() {
    solution_1().unwrap();
    solution_2().unwrap();
}
