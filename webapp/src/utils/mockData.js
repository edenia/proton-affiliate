const createData = (username, status, reward, tx) => {
  return { username, status, reward, tx }
}

const rows = [
  createData('johndowny', 'Pending', '-', '-'),
  createData('alexahohnson', 'Pending', '-', '-'),
  createData('robvega', 'Registered', '-', '-'),
  createData('annajin', 'KYC', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega2', 'Pending', '1024', '497073c0'),
  createData('annajin2', 'Pending', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho1', 'Expired', '200', '1d2a44c8'),
  createData('robvega3', 'Pending', '1024', '-'),
  createData('annajin3', 'Pending', '1024', '-'),
  createData('johndowny2', 'Pending', '1024', 'b37763c0'),
  createData('alexahohnson2', 'Expired', '1024', 'aa00bc83'),
  createData('robvega4', 'Expired', '1024', '-'),
  createData('annajin4', 'Expired', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho2', 'Expired', '200', '1d2a44c8'),
  createData('robvega5', 'Registered', '2500', '497073c0'),
  createData('annajin5', 'Registered', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho3', 'Expired', '200', '1d2a44c8'),
  createData('robvega6', 'Registered', '2500', '497073c0'),
  createData('annajin6', 'Registered', '2500', '-')
]

export { rows }
