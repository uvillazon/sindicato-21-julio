using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_DEUDAS_SOCIOS
    {
        public static Expression<Func<SD_DEUDAS_SOCIOS, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.ID_DEUDA);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.MOTIVO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.OBSERVACION.ToUpper().Contains(contiene.ToUpper());

            }
        }
    }

}
