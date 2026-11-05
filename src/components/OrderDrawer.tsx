import React, { useState } from 'react';
import { CartItem } from '../types/restaurant';
import { calculateBill, formatINR } from '../utils/booking';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Package, ArrowRight } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function OrderDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: OrderDrawerProps) {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [packagingType, setPackagingType] = useState<'banana-leaf' | 'brass-carrier'>('banana-leaf');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  if (!isOpen) return null;

  const bill = calculateBill(items);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const orderId = `CHL-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderId(orderId);
    setIsOrderPlaced(true);
  };

  const handleFinish = () => {
    onClearCart();
    setIsOrderPlaced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#12100d] border-l border-[#d4af37]/30 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2b271f] bg-[#171511]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-base font-cinzel font-semibold text-[#f5f0e6]">
              {isOrderPlaced ? 'Royal Order Placed' : 'Tasting Basket & Takeaway'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8f887b] hover:text-white rounded-lg hover:bg-[#23201a] transition-colors cursor-pointer"
            aria-label="Close basket drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isOrderPlaced ? (
            /* Order Placed Success View */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37]">
                  Order Successfully Dispatched to Kitchen
                </span>
                <h4 className="text-2xl font-cinzel font-bold text-[#f5f0e6] mt-1">
                  Taste of Thanjavur Awaits You
                </h4>
                <p className="text-xs text-[#a39e93] font-body mt-2">
                  Reference: <span className="font-mono text-[#d4af37] font-semibold">{placedOrderId}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0907] border border-[#2b271f] text-left text-xs space-y-2">
                <div className="flex justify-between text-[#a39e93]">
                  <span>Customer:</span>
                  <span className="text-white font-medium">{customerName || 'Royal Guest'}</span>
                </div>
                <div className="flex justify-between text-[#a39e93]">
                  <span>Format:</span>
                  <span className="text-white font-medium capitalize">{orderType} ({packagingType})</span>
                </div>
                <div className="flex justify-between text-[#a39e93]">
                  <span>Estimated Readiness:</span>
                  <span className="text-[#d4af37] font-medium font-mono">35 - 45 Mins</span>
                </div>
                <div className="flex justify-between border-t border-[#23201a] pt-2 text-[#d4af37] font-bold">
                  <span>Grand Total Paid:</span>
                  <span className="font-mono">{formatINR(bill.total)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-[#d4af37] rounded-xl hover:brightness-110 cursor-pointer"
              >
                Return to Menu
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <Package className="w-10 h-10 text-[#d4af37] mx-auto mb-3 opacity-40" />
              <h4 className="text-base font-cinzel text-[#f5f0e6]">Your Tasting Basket is Empty</h4>
              <p className="text-xs text-[#8f887b] font-body mt-1 max-w-xs mx-auto">
                Explore our royal menu and select banana-leaf feasts, Chettinad specialties, or degree coffee to prepare your feast.
              </p>
            </div>
          ) : (
            /* Items List & Order Form */
            <div className="space-y-6">
              {/* Item Rows */}
              <div className="space-y-3">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3.5 rounded-xl bg-[#090807] border border-[#23201a] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-cinzel font-semibold text-[#f5f0e6] truncate">
                        {cartItem.item.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#d4af37] mt-0.5">
                        {formatINR(cartItem.item.price)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-6 h-6 rounded bg-[#171511] border border-[#2b271f] text-[#a39e93] hover:text-white flex items-center justify-center cursor-pointer"
                        aria-label={`Decrease quantity of ${cartItem.item.name}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-semibold text-white w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-6 h-6 rounded bg-[#171511] border border-[#2b271f] text-[#a39e93] hover:text-white flex items-center justify-center cursor-pointer"
                        aria-label={`Increase quantity of ${cartItem.item.name}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="p-1 text-[#696357] hover:text-red-400 ml-1 cursor-pointer"
                        aria-label={`Remove ${cartItem.item.name} from basket`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="space-y-4 pt-4 border-t border-[#23201a]">
                <div>
                  <label className="block text-xs font-cinzel text-[#8f887b] mb-1.5">Dining Fulfillment</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 text-xs font-cinzel rounded-lg border transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5f0e6]'
                          : 'border-[#2b271f] text-[#8f887b]'
                      }`}
                    >
                      Thanjavur Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 text-xs font-cinzel rounded-lg border transition-colors ${
                        orderType === 'pickup'
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5f0e6]'
                          : 'border-[#2b271f] text-[#8f887b]'
                      }`}
                    >
                      Royal Takeaway
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-cinzel text-[#8f887b] mb-1.5">Packaging Heritage</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPackagingType('banana-leaf')}
                      className={`py-2 text-xs font-cinzel rounded-lg border transition-colors ${
                        packagingType === 'banana-leaf'
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5f0e6]'
                          : 'border-[#2b271f] text-[#8f887b]'
                      }`}
                    >
                      Banana Leaf Wrap (Eco)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackagingType('brass-carrier')}
                      className={`py-2 text-xs font-cinzel rounded-lg border transition-colors ${
                        packagingType === 'brass-carrier'
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f5f0e6]'
                          : 'border-[#2b271f] text-[#8f887b]'
                      }`}
                    >
                      Tiffin Carrier Set
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <form id="order-form" onSubmit={handlePlaceOrder} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] rounded-lg text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (for live tracking) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] rounded-lg text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  {orderType === 'delivery' && (
                    <div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Thanjavur Delivery Address / Landmark *"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] rounded-lg text-white outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Bill Summary */}
        {!isOrderPlaced && items.length > 0 && (
          <div className="p-6 bg-[#171511] border-t border-[#2b271f] space-y-3">
            <div className="text-xs space-y-1.5 text-[#a39e93]">
              <div className="flex justify-between">
                <span>Subtotal ({bill.totalItemsCount} items)</span>
                <span className="font-mono text-white">{formatINR(bill.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5% Restaurant Food)</span>
                <span className="font-mono text-white">{formatINR(bill.gst)}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Heritage Packaging</span>
                <span className="font-mono text-white">
                  {bill.packaging === 0 ? 'Complimentary' : formatINR(bill.packaging)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-cinzel font-bold text-[#d4af37] border-t border-[#2b271f] pt-2">
                <span>Grand Total</span>
                <span className="font-mono">{formatINR(bill.total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="order-form"
              className="w-full py-3.5 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Dispatch Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
