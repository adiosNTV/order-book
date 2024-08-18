import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type Type = "Buy" | "Sell"

const OrderTable = ({ order, type, isShowHeader = false }: { order: NumberOrder[], type: Type, isShowHeader?: boolean }) => {
    return (<div className='bg-white'>
        {/* <h1 className='font-bold text-[24px] mb-5'>{type} ORDER</h1> */}

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table" size='small'>
                {isShowHeader && <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '15%' }}>Side</TableCell>
                        <TableCell style={{ width: '30%' }}>Price (USDT)</TableCell>
                        <TableCell style={{ width: '25%' }}>Amount (BTC)</TableCell>
                        <TableCell style={{ width: '30%' }}>Total (USDT)</TableCell>
                    </TableRow>
                </TableHead>}
                <TableBody>
                    {order.map(([price, quantity], index) => (
                        <TableRow
                            key={index}
                            sx={{ border: 0 }}
                        >
                            <TableCell component="th" scope="row" style={{ width: '15%' }}>
                                <span className={type === "Buy" ? "text-[12px] font-bold text-green-400" : "text-[12px] font-bold text-red-400"}> {type} {index + 1}</span>
                            </TableCell>
                            <TableCell style={{ width: '30%' }} className='text-[11.5px]'>{Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(price)}</TableCell>
                            <TableCell style={{ width: '25%' }} className='text-[11.5px]'>{quantity.toFixed(5)}</TableCell>
                            <TableCell style={{ width: '30%' }} className='text-[11.5px]'>{Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 5,
                                maximumFractionDigits: 5
                            }).format((price) * (quantity))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>);
}

export default OrderTable;