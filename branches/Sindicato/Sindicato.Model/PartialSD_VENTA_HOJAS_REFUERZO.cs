using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_VENTA_HOJAS_REFUERZO
    {
        public static Expression<Func<SD_VENTA_HOJAS_REFUERZO, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.ID_VENTA);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.NOMBRE.ToUpper().Contains(contiene.ToUpper());

            }
        }
    }

}
