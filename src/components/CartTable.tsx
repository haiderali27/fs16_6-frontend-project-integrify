import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartItem, Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart, deletefromCart, removeFromCart } from '../store/cart';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}


 const SpanningTable: React.FC<{ items:CartItem[] }> = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddToCart = (product:Product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId:any) => {
        if(productId){
            dispatch(removeFromCart(productId));
        }
        };
        const handleDeleteFromCart = (productId:any) => {
            if(productId){
                dispatch(deletefromCart(productId));
            }
            };
    const invoiceSubtotal = items.reduce((sum, item) => sum + item.product.price! * item.quantity, 0);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IMG</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.product.id}>
            <TableCell><img src={row.product.images && row.product.images[0]} alt={row.product.title} style={{ width: '50px', height: '50px' }} /></TableCell>
              <TableCell>{row.product.description}</TableCell>
              <TableCell align="right">{row.product.title}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.product.price}</TableCell>
              <TableCell align="right">{ccyFormat(row.quantity * row.product.price!)}</TableCell>
              <TableCell align="right"> <Button variant="outlined" onClick={()=>handleAddToCart(row.product)}><AddIcon /></Button>    <Button variant="outlined" onClick={()=>handleRemoveFromCart(row.product.id)}><RemoveIcon /></Button></TableCell>
              <TableCell align="right"><Button variant="outlined" onClick={()=> handleDeleteFromCart(row.product.id)}><DeleteOutlineIcon /></Button></TableCell>

              
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default SpanningTable;