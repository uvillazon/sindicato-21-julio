using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_DETALLES_IMPRESION_HOJASManager : Repository<SD_DETALLES_IMPRESION_HOJAS>
    {


        public SD_DETALLES_IMPRESION_HOJASManager(IUnitOfWork uow) : base(uow) { }

    }
}
