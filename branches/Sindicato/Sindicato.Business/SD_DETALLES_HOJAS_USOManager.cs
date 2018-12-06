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
    public class SD_DETALLES_HOJAS_USOManager : Repository<SD_DETALLES_HOJAS_USO>
    {


        public SD_DETALLES_HOJAS_USOManager(IUnitOfWork uow) : base(uow) { }
    }
}
