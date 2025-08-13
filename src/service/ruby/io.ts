import {RUBY_ORDER} from "./ruby";

const io_read_line = (): [string, number] => {
  return ["gets.chomp", RUBY_ORDER.ATOMIC]
}

export const generators = {
  io_read_line,
}